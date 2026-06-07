package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "tweet_embeddings")
public class TweetEmbedding {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tweet_embeddings_seq")
    @SequenceGenerator(name = "tweet_embeddings_seq", sequenceName = "tweet_embeddings_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tweet_id", nullable = false, unique = true)
    private Tweet tweet;

    @Column(name = "vector_data", nullable = false, columnDefinition = "text")
    private String vectorData;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public TweetEmbedding() {
        this.updatedAt = LocalDateTime.now().withNano(0);
    }
}
