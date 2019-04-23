package com.laborExchange.coremodule.tokenSellsHistory.entity;

import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.user.entity.User;
import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@Table(name = "token_sells_history")
public class TokenSellsHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float amount;

    private float pricePerOne;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller", nullable = false)
    private User seller;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer", nullable = false)
    private User buyer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project", nullable = false)
    private Project project;


    private Timestamp transactionDate;


    public TokenSellsHistory(float amount, float pricePerOne, User seller, User buyer,Project project, Timestamp transactionDate) {
        this.amount = amount;
        this.pricePerOne = pricePerOne;
        this.seller = seller;
        this.buyer = buyer;
        this.transactionDate = transactionDate;
        this.project = project;
    }
}
