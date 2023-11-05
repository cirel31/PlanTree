package com.plantree.forestservice.domain.tree.infra.database;

import com.plantree.forestservice.domain.tree.application.repository.TreeRepository;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.domain.tree.infra.database.jpa.TreeJpaRepository;
import com.plantree.forestservice.domain.tree.infra.database.querydsl.TreeQueryRepository;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TreeRepositoryImpl implements TreeRepository {

    private final TreeJpaRepository treeJpaRepository;
    private final TreeQueryRepository treeQueryRepository;

    @Override
    public Tree save(Tree tree) {
        return treeJpaRepository.save(tree);
    }

    @Override
    public Optional<Tree> findById(UUID id) {
        return treeJpaRepository.findById(id);
    }

    @Override
    public Optional<Tree> findCurrentTreeByMemberId(UUID memberId) {
        return Optional.ofNullable(treeQueryRepository.findCurrentTreeByMemberId(memberId));
    }

}
