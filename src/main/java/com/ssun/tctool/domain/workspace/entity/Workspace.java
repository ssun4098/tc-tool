package com.ssun.tctool.domain.workspace.entity;

import com.ssun.tctool.global.jpa.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;

@NoArgsConstructor
@Getter
@SQLRestriction("deleted = false")
@Table(name = "workspace")
@Entity
public class Workspace extends BaseEntity {

    @Column(name = "name", length = 255, nullable = false)
    private String name;

    @Column(name = "deleted")
    private boolean isDeleted = false;

    @Builder
    public Workspace(String name) {
        this.name = name;
    }

    public void update(String name) {
        this.name = name;
    }

    public void delete() {
        this.isDeleted = true;
    }
}
