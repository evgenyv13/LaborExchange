package com.laborExchange.coremodule.odt;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Odt {

    public static <T, R> List<R> convertLists(List<T> objects, Function<T, R> mapper) {
        if(objects==null) return null;
        return objects.stream()
                .map(mapper)
                .collect(Collectors.toList());
    }
}
