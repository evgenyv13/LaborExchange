/*
package java;

import com.laborExchange.coremodule.user.service.UserService;
import com.laborExchange.coremodule.user.dto.UserDto;
import com.laborExchange.coremodule.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.junit.Test;

import static org.junit.Assert.*;

public class UserServiceTest {

    @Autowired
    private UserService service;

    @Test
    public void getUserInfo(){

        final String errorMessage = "Incorrect user was find";
        final String username = "Evgen";

        UserDto findedUser = service.getUserInfo("1");
        assertEquals(errorMessage, findedUser.getUsername(), username);
    }

    @Test
    public void getUserById(){

        final String errorMessage = "Incorrect user was find";
        final String username = "Evgen";

        User findedUser = service.getUserById("1");
        assertEquals(errorMessage, findedUser.getUsername(), username);
    }
}
*/