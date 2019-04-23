package com.laborExchange.webmodule.config;

import com.laborExchange.coremodule.user.entity.UserRole;
import com.laborExchange.webmodule.config.authDto.UserJwtParseDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenValidator {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenValidator.class);

    @Value("${APP-SECRET-KEY}")
    private String SECRET_KEY;

    public UserJwtParseDto validate(String token) {

        UserJwtParseDto userJwtParseDto = null;
        try {
            Claims body = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
            if (body != null) {
                String id = body.get("userId", Integer.class).toString();
                String username = body.get("userName", String.class);
                UserRole role = UserRole.valueOf(body.get("userRole", String.class));

                userJwtParseDto = new UserJwtParseDto(token,Long.parseLong(id),username,role);
            }
        }catch (MalformedJwtException e){
            LOGGER.info("Empty or invalid token: " + e.getMessage());
        }
        catch (SignatureException e) {
            LOGGER.warn("Someone tried to change token in header. Token value: " + token);
        } catch (Exception e) {
            LOGGER.warn("Exception in token validation(Maybe, no such user): ", e);
        }
        return userJwtParseDto;
    }


}
