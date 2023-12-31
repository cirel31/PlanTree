package com.plantree.forestservice.domain.branch.infra.database;

import com.plantree.forestservice.domain.branch.application.repository.BranchRepository;
import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.branch.infra.database.jpa.BranchJpaRepository;
import com.plantree.forestservice.domain.branch.infra.database.querydsl.BranchQueryRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class BranchRepositoryImpl implements BranchRepository {

    private final BranchJpaRepository branchJpaRepository;
    private final BranchQueryRepository branchQueryRepository;

    @Override
    public Branch save(
            Branch branch) {
        return branchJpaRepository.save(branch);
    }

    @Override
    public Optional<Branch> findById(UUID id) {
        return branchJpaRepository.findById(id);
    }

    @Override
    public void deleteById(UUID id) {
        branchJpaRepository.deleteById(id);
    }

    @Override
    public List<Branch> findBranchesWithBudsByTreeId(UUID treeId){
        return branchQueryRepository.findBranchesWithBudsByTreeId(treeId);
    }

    @Override
    public List<Branch> findBranchesWithBudsAndSeedsByTreeId(UUID treeId){
        return branchQueryRepository.findBranchesWithBudsAndSeedsByTreeId(treeId);
    }

    @Override
    public void saveAll(List<Branch> branches) {
        branchJpaRepository.saveAll(branches);
    }

}
