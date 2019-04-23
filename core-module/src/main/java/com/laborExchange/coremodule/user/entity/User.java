package com.laborExchange.coremodule.user.entity;

import com.laborExchange.coremodule.commentary.entity.Comment;
import com.laborExchange.coremodule.project.entity.Project;
import com.laborExchange.coremodule.projectOwners.ProjectOwners;
import com.laborExchange.coremodule.tasks.entity.Tasks;
import com.laborExchange.coremodule.tasksReply.entity.TaskReply;
import com.laborExchange.coremodule.tokenSellsHistory.entity.TokenSellsHistory;
import com.laborExchange.coremodule.user.userFields.education.Education;
import com.laborExchange.coremodule.user.userFields.languageLevel.LanguageLevel;
import com.laborExchange.coremodule.user.userFields.userSkill.UserSkill;
import com.laborExchange.coremodule.user.userFields.workExperience.WorkExperience;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Size(min = 5, max = 45)
    private String username;
    @Size(min = 5, max = 255)
    private String password;
    private String mail;
    private String website;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
    private String skills;

    @Size(max = 60)
    private String linkedin;
    @Size(max = 60)
    private String gmail;
    @Size(max = 60)
    private String twitter;
    @Size(max = 60)
    private String github;
    @Size(max = 60)
    private String youtube;
    @Size(max=200)
    private String aboutMe;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "seller") /*Token Transaction history where user sell*/
    private List<TokenSellsHistory> sellerHistory;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "buyer") /*Token Transaction history where user buy*/
    private List<TokenSellsHistory> buyerHistory;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user") /*Experience of company work*/
    private List<WorkExperience> userWorkExperience;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user") /*List of education of user*/
    private List<Education> educations;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user") /*Experience of lang levels*/
    private List<LanguageLevel> languageLevels;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user") /*Experience of lang levels*/
    private List<UserSkill> userSkills;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "projectOwner") /*Projects that user owned*/
    private List<Project> ownedMainProject;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userAccepteed")
    private List<Tasks> myTasks;

/*
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "percentedOwnersProject")
    private List<Project> percentedOwnedProjects;
*/

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private List<ProjectOwners> percentedOwnedProjects;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private List<TaskReply> myReplyingTasks;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "fromUser")
    private List<Comment> imCommented;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "forUser")
    private List<Comment> commentsForMe;

    public User() {
    }

    public User(Long id,@Size(min = 5, max = 20) String username, UserRole userRole) {
        this.id = id;
        this.username = username;
        this.userRole = userRole;
    }


    public User(@Size(min = 3, max = 50) String email, @Size(min = 5, max = 100) String password) {
        this.password = password;
        this.mail = email;
    }

    public User(@Size(min = 5, max = 20) String username, @Size(min = 5, max = 100) String password, @Size(min = 3, max = 50) String email, UserRole userRole) {
        this.username = username;
        this.password = password;
        this.mail = email;
        this.userRole = userRole;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", mail='" + mail + '\'' +
                ", website='" + website + '\'' +
                ", userRole=" + userRole +
                ", skills='" + skills + '\'' +
                '}';
    }
}
