package com.gmail.merikbest2015.twitterspringreactjs.model;

import com.gmail.merikbest2015.twitterspringreactjs.enums.InteractionType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "user_interaction_events")
public class UserInteractionEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_interaction_events_seq")
    @SequenceGenerator(name = "user_interaction_events_seq", sequenceName = "user_interaction_events_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tweet_id", nullable = false)
    private Tweet tweet;

    @Enumerated(EnumType.STRING)
    @Column(name = "interaction_type", nullable = false)
    private InteractionType interactionType;

    @Column(name = "event_time", nullable = false)
    private LocalDateTime eventTime;

    @Column(name = "dwell_seconds")
    private Integer dwellSeconds;

    public UserInteractionEvent() {
        this.eventTime = LocalDateTime.now().withNano(0);
    }
}
