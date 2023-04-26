import React from 'react';
import './css/style.css'

let renderCount = 0;

export default React.memo(function IsFive({ value }) { // React.memo делает сравнение старых и новых пропров если не изменилось то ререндора не будет
    console.warn(`🔴 isFive render: ${++renderCount}`);

    const getResult = React.useMemo(() => { // если зависимость меняется вызывается, если нет тоесть 5 осталось, а обновился какой-то другой компаненент, то useMemo вернёт предыдущие значение 
        let i = 0;
        while (i < 600000000) i++;
        return value === 5 ? '✅ Это пять :D' : '❌ Это не пять :(';
    }, [value]) // Это опитимизация / useMemo - жто хук которым помогает выполнять сложнуюлогику только тогда когда это необходимо

    return <h3>{getResult}</h3>; // мы не можем вернутиь функцию getResult() т.к. useMemo  строчку
}, (prevProps, nextProps) => { // мы не указываем эту функцию то будет поверхострная проверка (shalow equal) 
    if(nextProps.value === 5) { // делать ререндер только если value = 5 
        return false
    } else {
        return true
    }
})
