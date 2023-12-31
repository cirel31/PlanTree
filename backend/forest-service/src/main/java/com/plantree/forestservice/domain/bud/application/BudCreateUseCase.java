package com.plantree.forestservice.domain.bud.application;

import com.plantree.forestservice.domain.branch.application.repository.BranchRepository;
import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.bud.application.repository.BudRepository;
import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.domain.bud.domain.BudCreatedEvent;
import com.plantree.forestservice.domain.bud.domain.Day;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.event.EventProducer;
import com.plantree.forestservice.global.exception.Branch.BranchNotFoundException;
import com.plantree.forestservice.global.util.AuthMemberValidator;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BudCreateUseCase {

    private final BudRepository budRepository;
    private final BranchRepository branchRepository;
    private final AuthMemberValidator authMemberValidator;

    @Transactional
    public Bud createBud(UUID treeId, UUID branchId, String name, Day dayOfWeek,
            AuthMember authMember) {

        Branch branch = branchRepository.findById(branchId)
                                        .orElseThrow(BranchNotFoundException::new);
        authMemberValidator.checkAuthMemberFromTreeId(treeId, authMember);

        Bud bud = budRepository.save(Bud.builder()
                                        .name(name)
                                        .day(dayOfWeek)
                                        .studentId(authMember.getMemberId())
                                        .branch(branch)
                                        .build());
        BudCreatedEvent budCreatedEvent = BudCreatedEvent.builder()
                                                         .treeId(treeId)
                                                         .studentId(authMember.getMemberId())
                                                         .budId(bud.getId())
                                                         .budName(bud.getName())
                                                         .build();
        EventProducer.send(budCreatedEvent);
        return bud;

    }
}
