package com.gmail.merikbest2015.twitterspringreactjs.service.personalization;

import com.gmail.merikbest2015.twitterspringreactjs.model.Tag;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.TweetEmbedding;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TagRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TweetEmbeddingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagVocabularyService {

    private static final List<String> FALLBACK_TAGS = List.of(
            "java", "spring", "react", "dsa", "devops", "database", "career", "cpp", "python", "javascript",
            "typescript", "ai", "ml", "oop", "api", "docker", "kubernetes", "sql", "nosql", "git"
    );
    private static final Pattern HASHTAG_PATTERN = Pattern.compile("(#\\w+)\\b");

    private final TagRepository tagRepository;
    private final TweetEmbeddingRepository tweetEmbeddingRepository;

    private volatile List<String> vocabulary = FALLBACK_TAGS;
    private volatile Map<String, Pattern> tokenPatterns = Map.of();

    @PostConstruct
    public void init() {
        refreshVocabulary();
    }

    @Scheduled(fixedDelayString = "${app.personalization.tag-vocabulary-refresh-ms:300000}")
    public void refreshVocabulary() {
        List<String> tags = tagRepository.findAllTagNamesOrdered();
        if (tags == null || tags.isEmpty()) {
            vocabulary = FALLBACK_TAGS;
        } else {
            vocabulary = tags.stream()
                    .map(tag -> tag.replace("#", "").toLowerCase(Locale.ROOT).trim())
                    .filter(tag -> !tag.isEmpty())
                    .distinct()
                    .sorted((left, right) -> Integer.compare(right.length(), left.length()))
                    .collect(Collectors.toList());
        }
        Map<String, Pattern> patterns = new ConcurrentHashMap<>();
        for (String token : vocabulary) {
            patterns.put(token, Pattern.compile("\\b" + Pattern.quote(token) + "\\b", Pattern.CASE_INSENSITIVE));
        }
        tokenPatterns = patterns;
    }

    public List<String> getVocabulary() {
        return vocabulary;
    }

    public Set<String> extractTags(String text) {
        Set<String> tags = new HashSet<>();
        addTagsFromText(text, tags);
        return tags;
    }

    public Set<String> extractTags(Tweet tweet) {
        Set<String> tags = new HashSet<>();
        if (tweet == null) {
            return tags;
        }
        addTagsFromText(tweet.getText(), tags);
        if (tweet.getId() != null) {
            addTagsFromDatabase(tweet.getId(), tags);
        }
        return tags;
    }

    private void addTagsFromText(String text, Set<String> tags) {
        String normalized = text == null ? "" : text.toLowerCase(Locale.ROOT);

        Matcher matcher = HASHTAG_PATTERN.matcher(normalized);
        while (matcher.find()) {
            String hashtag = matcher.group(1).replace("#", "");
            if (!hashtag.isEmpty()) {
                tags.add(hashtag);
            }
        }

        for (String token : vocabulary) {
            Pattern pattern = tokenPatterns.get(token);
            if (pattern != null && pattern.matcher(normalized).find()) {
                tags.add(token);
            }
        }
    }

    private void addTagsFromDatabase(Long tweetId, Set<String> tags) {
        List<Tag> linkedTags = tagRepository.findByTweets_Id(tweetId);
        if (linkedTags == null) {
            return;
        }
        for (Tag tag : linkedTags) {
            if (tag.getTagName() != null) {
                tags.add(normalizeTagToken(tag.getTagName()));
            }
        }
    }

    private String normalizeTagToken(String tagName) {
        return tagName.replace("#", "").toLowerCase(Locale.ROOT).trim();
    }

    public double[] buildEmbedding(String text) {
        return buildEmbedding(text, Set.of());
    }

    public double[] buildEmbedding(Tweet tweet) {
        if (tweet == null) {
            return buildEmbedding((String) null, Set.of());
        }
        Set<String> textTags = extractTags(tweet.getText());
        Set<String> allTags = extractTags(tweet);
        Set<String> dbTags = allTags.stream()
                .filter(tag -> !textTags.contains(tag))
                .collect(Collectors.toSet());
        return buildEmbedding(tweet.getText(), dbTags);
    }

    private double[] buildEmbedding(String text, Set<String> databaseTags) {
        double[] vector = new double[vocabulary.size()];
        String normalized = text == null ? "" : text.toLowerCase(Locale.ROOT);
        Set<String> hashtags = extractHashtagsOnly(normalized);
        Set<String> dbTagTokens = databaseTags == null ? Set.of() : databaseTags;

        for (int i = 0; i < vocabulary.size(); i++) {
            String token = vocabulary.get(i);
            Pattern pattern = tokenPatterns.get(token);
            int count = 0;
            if (pattern != null) {
                Matcher tokenMatcher = pattern.matcher(normalized);
                while (tokenMatcher.find()) {
                    count++;
                }
            }
            if (hashtags.contains(token) || dbTagTokens.contains(token)) {
                count += 2;
            }
            vector[i] = count;
        }
        return normalize(vector);
    }

    public double[] getOrBuildTweetVector(Tweet tweet) {
        Optional<TweetEmbedding> existing = tweetEmbeddingRepository.findByTweet_Id(tweet.getId());
        if (existing.isPresent()) {
            double[] stored = deserializeVector(existing.get().getVectorData());
            if (stored.length == vocabulary.size()) {
                return stored;
            }
        }
        return normalize(buildEmbedding(tweet));
    }

    public String serializeVector(double[] vector) {
        return Arrays.stream(vector)
                .mapToObj(value -> String.format(Locale.ROOT, "%.8f", value))
                .collect(Collectors.joining(","));
    }

    private Set<String> extractHashtagsOnly(String normalized) {
        Set<String> tags = new HashSet<>();
        Matcher matcher = HASHTAG_PATTERN.matcher(normalized);
        while (matcher.find()) {
            tags.add(matcher.group(1).replace("#", ""));
        }
        return tags;
    }

    private double[] deserializeVector(String vectorData) {
        String[] parts = vectorData.split(",");
        double[] vector = new double[parts.length];
        for (int i = 0; i < parts.length; i++) {
            vector[i] = Double.parseDouble(parts[i]);
        }
        return vector;
    }

    private double[] normalize(double[] vector) {
        double norm = 0.0;
        for (double value : vector) {
            norm += value * value;
        }
        if (norm == 0.0) {
            return vector;
        }
        double denom = Math.sqrt(norm);
        double[] normalized = new double[vector.length];
        for (int i = 0; i < vector.length; i++) {
            normalized[i] = vector[i] / denom;
        }
        return normalized;
    }
}
