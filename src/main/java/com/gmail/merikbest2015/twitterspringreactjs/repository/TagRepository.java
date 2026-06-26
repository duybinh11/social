package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.Tag;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tag.TagProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    Page<TagProjection> findByOrderByTweetsQuantityDesc(Pageable pageable);

    List<TagProjection> findTop5ByOrderByTweetsQuantityDesc();

    Tag findByTagName(String tagName);

    @Query("SELECT t.tagName FROM Tag t WHERE t.tweetsQuantity > 0 ORDER BY t.tweetsQuantity DESC")
    List<String> findAllTagNamesOrdered();

    List<Tag> findByTweets_Id(Long id);
}
