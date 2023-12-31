package com.plantree.commonservice.domain.quest.application;

import com.plantree.commonservice.domain.quest.application.repository.QuestRepository;
import com.plantree.commonservice.domain.quest.domain.Quest;
import com.plantree.commonservice.domain.quest.dto.QuestUpdateReqDto;
import com.plantree.commonservice.global.config.webmvc.AuthMember;
import com.plantree.commonservice.global.exception.quest.QuestNotFoundException;
import com.plantree.commonservice.global.util.AuthMemberValidator;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class QuestUpdateUseCase {

    private final QuestRepository questRepository;
    private final AuthMemberValidator authMemberValidator;

    @Transactional
    public void updateQuest(UUID questId, QuestUpdateReqDto questUpdateReqDto,
            AuthMember authMember) {

        Quest quest = questRepository.findById(questId)
                                     .orElseThrow(QuestNotFoundException::new);
        authMemberValidator.validateAuthMemberAndQuestIssuer(quest.getIssuer(), authMember);

        quest.updateTitle(questUpdateReqDto.getTitle());
        quest.updateContent(questUpdateReqDto.getContent());

    }


    @Transactional
    public void acceptQuest(UUID questId, AuthMember authMember) {

        Quest quest = questRepository.findById(questId)
                                     .orElseThrow(QuestNotFoundException::new);
        authMemberValidator.ValidateAuthMemberAndQuestAcceptor(quest.getAcceptor(), authMember);
        quest.accept();

    }

    @Transactional
    public void questSuccessRequest(UUID questId, AuthMember authMember) {

        Quest quest = questRepository.findById(questId)
                                     .orElseThrow(QuestNotFoundException::new);
        authMemberValidator.ValidateAuthMemberAndQuestAcceptor(quest.getAcceptor(), authMember);
        quest.finishRequest();

    }

    @Transactional
    public void questSuccessAccept(UUID questId, AuthMember authMember) {

        Quest quest = questRepository.findById(questId)
                                     .orElseThrow(QuestNotFoundException::new);
        authMemberValidator.validateAuthMemberAndQuestIssuer(quest.getIssuer(), authMember);
        quest.finish();

    }

    @Transactional
    public void checkQuest(UUID questId, AuthMember authMember) {

        Quest quest = questRepository.findById(questId)
                                     .orElseThrow(QuestNotFoundException::new);
        authMemberValidator.ValidateAuthMemberAndQuestAcceptor(quest.getAcceptor(), authMember);
        quest.check();

    }
}
