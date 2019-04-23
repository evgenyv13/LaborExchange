package com.laborExchange.coremodule.tokenSellsHistory.repository;

import com.laborExchange.coremodule.tokenSellsHistory.entity.TokenSellsHistory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenSellsHistoryRepository extends CrudRepository<TokenSellsHistory, Long> {
}
