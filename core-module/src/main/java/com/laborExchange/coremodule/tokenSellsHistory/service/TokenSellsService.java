package com.laborExchange.coremodule.tokenSellsHistory.service;

import com.laborExchange.coremodule.projectOwners.ProjectOwnersDto;
import com.laborExchange.coremodule.projectOwners.dto.ProjectsInTradeListItemDto;
import com.laborExchange.coremodule.tokenSellsHistory.entity.TokenSellsHistory;
import com.laborExchange.coremodule.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;

public interface TokenSellsService {
    @Transactional
    TokenSellsHistory buyToken(User userBuyer, long tokenId, float tokenAmmount);

    Page<ProjectsInTradeListItemDto> getProjectsInTrading(Pageable pageable);

    Page<ProjectOwnersDto> findUserTokens(User user, Pageable pageable);
}
