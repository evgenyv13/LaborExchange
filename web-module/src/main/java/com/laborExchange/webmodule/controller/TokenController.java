package com.laborExchange.webmodule.controller;

import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.project.service.ProjectService;
import com.laborExchange.coremodule.projectOwners.ProjectOwners;
import com.laborExchange.coremodule.projectOwners.ProjectOwnersDto;
import com.laborExchange.coremodule.projectOwners.dto.ProjectsInTradeListItemDto;
import com.laborExchange.coremodule.tokenSellsHistory.dto.TokenSellsHistoryDto;
import com.laborExchange.coremodule.tokenSellsHistory.entity.TokenSellsHistory;
import com.laborExchange.coremodule.tokenSellsHistory.service.TokenSellsService;
import com.laborExchange.coremodule.user.entity.User;
import com.laborExchange.webmodule.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class TokenController {


    @Autowired
    private ProjectService projectService;
    @Autowired
    private CommonService commonService;
    @Autowired
    private TokenSellsService tokenSellsService;


    /**
     * @param projectId
     * @param tokensAmmount(float)(Application/Json Raw Format )
     * @return
     */
    @PostMapping(value = "/projects/{projectId}/sellTokens")
    public Object sellProjectTokens(@PathVariable("projectId") String projectId, @RequestBody float tokensAmmount) {
        User user = commonService.getCurrentUser();
        Project project = projectService.getProjectById(projectId);

        ProjectOwners projectOwners = projectService.putUpTokensForSale(project,user,tokensAmmount);
        return new ProjectOwnersDto(projectOwners);
    }

    /**
     * Duplicated method from
     * @GetMapping(value = "/projects/{projectId}/getProjectPartners")
     */
    @GetMapping(value = "/projects/{projectId}/projectTokenOwners")
    public Object getProjectOwners(@PathVariable("projectId") long projectId, Pageable pageable) {
        Long userId = commonService.getCurrentUserId();
        return projectService.getProjectPartnersList(projectId,userId,pageable);
    }

    /* method for all users */
    @GetMapping(value = "/projects/{projectId}/projectSalaryTokens")
    public Object getProjectTokenSalary(@PathVariable("projectId") String projectId, Pageable pageable) {
        Project project = projectService.getProjectById(projectId);
        return projectService.getTokenSellsByProject(project,pageable);
    }

    @PostMapping(value = "/projects/{projectId}/tokens/setTokenPrice")
    public Object setProjectTokenPrice(@PathVariable("projectId") String projectId,@RequestBody float tokenPrice) {
        User user = commonService.getCurrentUser();
        Project project = projectService.getProjectById(projectId);

        ProjectOwners projectOwners = projectService.setTokenPrice(project,user,tokenPrice);
        return new ProjectOwnersDto(projectOwners);
    }

    @PostMapping(value = "/projects/{projectId}/backSelleProjectTokens")
    public Object backSelleProjectTokens(@PathVariable("projectId") String projectId,@RequestBody float tokensAmmount) {
        User user = commonService.getCurrentUser();
        Project project = projectService.getProjectById(projectId);

        ProjectOwners projectOwners =  projectService.getUpTokensFromSale(project,user,tokensAmmount);
        return new ProjectOwnersDto(projectOwners);
    }

    /**
     * FormData
     * @param tokenId
     * @param tokenAmount
     * @return TokenSellsHistoryDto / Exception
     */
    @PostMapping(value = "/tokens/buyToken")
    public Object buyToken(@ModelAttribute("tokenId") Long tokenId,@ModelAttribute("tokenAmount") float tokenAmount) {
        User user = commonService.getCurrentUser();

        TokenSellsHistory tokenSellsHistory = tokenSellsService.buyToken(user,tokenId,tokenAmount);
        return new TokenSellsHistoryDto(tokenSellsHistory);
    }

    /* UNOPTIMIZED METHOD */
    @GetMapping(value = "/projects/tokenTrading")
    public Object getProjectsWhereExistsTokenTrading(Pageable pageable) {
        Page<ProjectsInTradeListItemDto> projectsInTradeListItemDtos = tokenSellsService.getProjectsInTrading(pageable);
        return ResponseEntity.ok().body(projectsInTradeListItemDtos);
    }

    /* UNOPTIMIZED METHOD */
    @GetMapping(value = "/users/myTokens")
    public Object getUserTokens(Pageable pageable) {
        User user = commonService.getCurrentUser();
        return tokenSellsService.findUserTokens(user,pageable);
    }



}
