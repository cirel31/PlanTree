package com.plantree.forestservice.domain.branch.domain;

import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.domain.seed.domain.Seed;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.global.entity.BaseTimeEntity;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "branch")
@Getter
@NoArgsConstructor
public class Branch extends BaseTimeEntity {

    @Id
    @Column(name = "branch_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @Column
    private String name;

    @Column
    private String color;

    @Column
    private UUID studentId;

    @Column
    private UUID issuerId;

    @ManyToOne
    private Tree tree;

    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Seed> seeds = new ArrayList<>();

    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Bud> buds = new ArrayList<>();

}
