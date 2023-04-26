import React from "react"

// class List extends React.Component {

//     state = {
//         numbers: [1, 2, 3]
//     }

//     addRandomNumber = () => {
//         const randNumber = Math.round(Math.random() * 10)
//         //console.log(this.state.numbers);
//         this.setState({
//             numbers: [...this.state.numbers, randNumber],
//         })
//     }

//     componentDidMount() {
//         console.log('Компонент был отображён!')
//     }

//     componentDidUpdate(prevProps, prevState) {
//         //console.log(prevProps, prevState, this.props, this.state)
//         if(this.state.numbers !== prevProps.numbers) {
//             console.log('Список чисел обновился!')
//         }
//     }

//     componentWillUnmount() {
//         console.log('Компонент будет удалён!')
//     }

//     render() {
//         return (
//             <div>
//                 <ul>
//                     {this.state.numbers.map((num, index) => (
//                         <li key={index}>{num}</li>
//                     ))}
//                 </ul>
//                 <button onClick={this.addRandomNumber} >Новое число</button>
//             </div>
//         )
//     }
// }

const List = () => {
    const [numbers, setNumbers] = React.useState([1, 2, 3, 4, 5, 6])
    const [count, setCount] = React.useState(0) // основление происходит или при изменения состояния или изменения пропросв
    const ulRef = React.useRef()
    const timerRef = React.useRef()
    const numbersRef = React.useRef()

    numbersRef.current = numbers

    const addNumber = () => {
        setNumbers(prev => [...prev, prev[prev.length - 1] + 1])
    }

    React.useEffect(() => {
        //console.log('Компонент был создан!')
    }, [])

    React.useEffect(() => {
        //console.log('Компонент был обновлён!')
    }, [numbers, count])

    React.useEffect(() => {
        return () => {
            //console.log('WILL UNMOUNT')
        }
    }, [])

    const start = () => {
        timerRef.current = setInterval(addNumber, 1000)
    }

    const stop = () => {
        clearInterval(timerRef.current)
    }

    const handleScroll = React.useCallback(() => { // теперь функция не будет пересоздаваться при каждом ререндере и сылка терятся не будет
        console.log('Был скроол!',  numbersRef.current)
    }, []) // без реф никак так как в функции остаётся старая ссылка до того момента пока её не вызовут сноа

    React.useEffect(() => {
        ulRef.current.addEventListener('scroll', handleScroll) // мы не ищем в useEffect элемент, а просто обращаемся речез ref // условно мы помещаем в переменную элемент и от рендора к рендору ссылка может теряться и мы на прямую указыварем ref
    }, [])

    const removeScroll = () => {
        console.log(handleScroll);
        ulRef.current.removeEventListener('scroll', handleScroll) 
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>+</button>
            <ul ref={ulRef} style={{height: 100, overflow: 'auto', border: '2px solid #black'}}>
                {numbers.map((num, index) => (
                    <li key={index}>{num}</li>
                ))}
            </ul>
            <button onClick={addNumber} >Новое число</button>
            <button onClick={removeScroll}>Не следить</button>
            <button onClick={start} >Старт</button>
            <button onClick={stop}>Стоп</button>
        </div>
    )
}

export default List