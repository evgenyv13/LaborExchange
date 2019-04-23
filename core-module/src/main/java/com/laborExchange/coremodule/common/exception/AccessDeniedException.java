package com.laborExchange.coremodule.common.exception;

public class AccessDeniedException extends CustomWebAppException {
    public AccessDeniedException(String description) {
        super(description);
    }
}
