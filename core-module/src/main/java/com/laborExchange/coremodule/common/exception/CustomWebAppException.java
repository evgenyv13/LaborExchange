package com.laborExchange.coremodule.common.exception;

public abstract class CustomWebAppException extends RuntimeException  {
    private String description;

    public String toString() {
        return "Exception " + this.getClass().getName() + "[" + description + "] ";
    }

    public CustomWebAppException(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
