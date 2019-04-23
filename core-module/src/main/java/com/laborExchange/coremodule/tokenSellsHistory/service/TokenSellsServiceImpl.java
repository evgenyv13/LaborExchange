package com.laborExchange.coremodule.tokenSellsHistory.service;

import com.laborExchange.coremodule.common.exception.UncorrectEntityException;
import com.laborExchange.coremodule.projectOwners.ProjectOwners;
import com.laborExchange.coremodule.projectOwners.ProjectOwnersDto;
import com.laborExchange.coremodule.projectOwners.ProjectOwnersRepository;
import com.laborExchange.coremodule.projectOwners.dto.ProjectsInTradeListItemDto;
import com.laborExchange.coremodule.tokenSellsHistory.entity.TokenSellsHistory;
import com.laborExchange.coremodule.tokenSellsHistory.repository.TokenSellsHistoryRepository;
import com.laborExchange.coremodule.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.time.Clock;
import java.time.LocalDateTime;

@Service
public class TokenSellsServiceImpl implements TokenSellsService {

    private final ProjectOwnersRepository projectOwnersRepository;
    private final TokenSellsHistoryRepository tokenSellsHistoryRepository;

    @Autowired
    public TokenSellsServiceImpl(ProjectOwnersRepository projectOwnersRepository, TokenSellsHistoryRepository tokenSellsHistoryRepository) {
        this.projectOwnersRepository = projectOwnersRepository;
        this.tokenSellsHistoryRepository = tokenSellsHistoryRepository;
    }

    @Override
    @Transactional
    public TokenSellsHistory buyToken(User userBuyer, long tokenId, float tokenAmmount) {
        ProjectOwners projectOwnerSeller = projectOwnersRepository.findById(tokenId).orElseThrow(() -> new EntityNotFoundException("Unavailable"));

        // check for tokens amount and that buyer does't buy token's from itself
        if(userBuyer.getId()==projectOwnerSeller.getUser().getId()){
            throw new UncorrectEntityException("You cannot buy tokens from yourself");
        }
        if(projectOwnerSeller.getFreeToSellToken()<tokenAmmount){
            throw new UncorrectEntityException("The seller does not have so many tokens");
        }

        ProjectOwners projectOwnerBuyer = projectOwnersRepository.findByUserAndProject(userBuyer,projectOwnerSeller.getProject());

        // if user have token's of this project in first
        if(projectOwnerBuyer==null){
            projectOwnerBuyer = new ProjectOwners(userBuyer,tokenAmmount,projectOwnerSeller.getProject());
            projectOwnersRepository.save(projectOwnerBuyer);
            projectOwnerSeller.setFreeToSellToken(projectOwnerSeller.getFreeToSellToken()-tokenAmmount);
        }else {
            projectOwnerBuyer.setPercent(projectOwnerBuyer.getPercent()+tokenAmmount);
            projectOwnerSeller.setFreeToSellToken(projectOwnerSeller.getFreeToSellToken()-tokenAmmount);
        }

        LocalDateTime localDateTime = LocalDateTime.now(Clock.systemUTC());
        Timestamp timestamp = Timestamp.valueOf(localDateTime);

        TokenSellsHistory tokenSellsHistory = new TokenSellsHistory(tokenAmmount,projectOwnerSeller.getFreeToSellPerTokenPrice(),projectOwnerSeller.getUser(),userBuyer, projectOwnerSeller.getProject(),timestamp);
        tokenSellsHistoryRepository.save(tokenSellsHistory);

        return tokenSellsHistory;
    }

    @Override
    public Page<ProjectsInTradeListItemDto> getProjectsInTrading(Pageable pageable) {
        return projectOwnersRepository.findAllProjectsInTradeByPage(pageable);
    }

    @Override
    public Page<ProjectOwnersDto> findUserTokens(User user, Pageable pageable) {
        return projectOwnersRepository.findByUser(user,pageable).map(ProjectOwnersDto::new);
    }
}
