package com.ssun.tctool.global.jpa;

import jakarta.persistence.AttributeConverter;

import java.util.Arrays;
import java.util.Objects;

public abstract class BaseEnumConverter<T extends Enum<T> & BaseEnum<E>, E> implements AttributeConverter<T, E> {

    private final Class<T> clazz;

    protected BaseEnumConverter(Class<T> clazz) {
        this.clazz = clazz;
    }

    @Override
    public E convertToDatabaseColumn(T t) {
        return t.getCode();
    }

    @Override
    public T convertToEntityAttribute(E e) {
        if (Objects.isNull(e)) {
            return null;
        }
        return Arrays.stream(clazz.getEnumConstants())
                .filter(c -> c.getCode().equals(e))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown code: " + e));
    }
}
