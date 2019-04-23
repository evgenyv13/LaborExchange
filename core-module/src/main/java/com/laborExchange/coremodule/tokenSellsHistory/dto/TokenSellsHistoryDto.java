package com.laborExchange.coremodule.tokenSellsHistory.dto;

import com.laborExchange.coremodule.tokenSellsHistory.entity.TokenSellsHistory;
import com.laborExchange.coremodule.user.dto.UserDto;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TokenSellsHistoryDto {

    private Long id;
    private float amount;
    private float pricePerOne;

    private UserDto seller;
    private UserDto buyer;

    private LocalDateTime transactionDate;

    public TokenSellsHistoryDto(TokenSellsHistory tokenSellsHistory) {
        this.id = tokenSellsHistory.getId();
        this.amount = tokenSellsHistory.getAmount();
        this.pricePerOne = tokenSellsHistory.getPricePerOne();

        this.seller = new UserDto(tokenSellsHistory.getSeller());
        this.buyer = new UserDto(tokenSellsHistory.getBuyer());

        if (tokenSellsHistory.getTransactionDate() != null)
            this.transactionDate = tokenSellsHistory.getTransactionDate().toLocalDateTime();
    }
}
