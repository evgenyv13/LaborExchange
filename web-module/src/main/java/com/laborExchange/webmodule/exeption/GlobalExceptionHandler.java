package com.laborExchange.webmodule.exeption;

import com.laborExchange.coremodule.common.exception.AccessDeniedException;
import com.laborExchange.coremodule.common.exception.EntityNotFoundCustomException;
import com.laborExchange.coremodule.common.exception.UncorrectEntityException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler  {

    @ExceptionHandler(EntityNotFoundCustomException.class)
    public ResponseEntity handleEntityNotFoundException(EntityNotFoundCustomException ex) {
        return ResponseEntity.status(404).body(ex.getDescription());
    }

    @ExceptionHandler(UncorrectEntityException.class)
    public ResponseEntity handleUncorrectedEntityException(UncorrectEntityException ex) {
        return ResponseEntity.status(400).body(ex.getDescription());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity handleUncorrectedEntityException(AccessDeniedException ex) {
        return ResponseEntity.status(403).body(ex.getDescription());
    }

}
