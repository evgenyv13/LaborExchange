package com.laborExchange.webmodule.config;

import com.laborExchange.coremodule.user.entity.User;
import com.laborExchange.coremodule.user.entity.UserRole;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class JwtVal {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtVal.class);

    public User validate(String token) {

        User jwtUser = null;
        try {
            Claims body = Jwts.parser().setSigningKey("strart-secretup-key").parseClaimsJws(token).getBody();
            if (body != null) {
                String username = body.get("username", String.class);
                UserRole role = UserRole.valueOf(body.get("role", String.class));
                jwtUser = new User(username, "dto-dto", "dto", role);
            }
        }catch (MalformedJwtException e){
            LOGGER.info("Empty or invalid token: " + e.getMessage());
        }
        catch (SignatureException e) {
            LOGGER.warn("Someone tried to change token in header. Token value: " + token);
        } catch (Exception e) {
            LOGGER.warn("Exception in token validation(Maybe, no such user): ", e);
        }
        return jwtUser;
    }


}
