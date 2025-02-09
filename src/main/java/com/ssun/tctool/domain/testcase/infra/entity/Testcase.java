package com.ssun.tctool.domain.testcase.infra.entity;

import com.ssun.tctool.domain.workspace.entity.Workspace;
import com.ssun.tctool.global.jpa.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@SQLRestriction("deleted = false")
@Table(name = "testcase")
public class Testcase extends BaseEntity {

    @Column(name = "name", length = 255, nullable = false)
    private String name;

    @Lob
    @Column(name = "explanation")
    private String explanation;

    @Column(name = "assignee", length = 32)
    private String assignee;

    @Column(name = "category1", length = 32)
    private String category1;

    @Column(name = "category2", length = 32)
    private String category2;

    @Column(name = "category3", length = 32)
    private String category3;

    @Column(name = "status", nullable = false)
    private TestStatus status = TestStatus.NOT_STARTED;

    @Column(name = "deleted")
    private boolean isDeleted = false;

    @ManyToOne
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;

    @Column(name = "link")
    private String link;

    @Builder
    public Testcase(String name, String explanation, String assignee, String category1, String category2, String category3, String link, Workspace workspace) {
        this.name = name;
        this.explanation = explanation;
        this.assignee = assignee;
        this.category1 = category1;
        this.category2 = category2;
        this.category3 = category3;
        this.workspace = workspace;
        this.link = link;
    }

    public void update(String name, String explanation, String assignee, String category1, String category2, String category3, String link) {
        this.name = name;
        this.explanation = explanation;
        this.assignee = assignee;
        this.category1 = category1;
        this.category2 = category2;
        this.category3 = category3;
        this.link = link;
    }

    public void delete() {
        this.isDeleted = true;
    }
}
