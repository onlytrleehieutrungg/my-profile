import { useDispatch } from "react-redux";
import Link from 'next/link';
import { decrement, increment, useStoreCounter } from "../../src/core/store";

export default function Landing() {
    const countState = useStoreCounter();
    const dispatch = useDispatch();
    return (
        <div >

            <div>{countState?.value}</div>
            <Link href={"/onlytrleehietrungg"} >to profile</Link>
            <button onClick={() => dispatch(increment())}>increment</button>
            <button onClick={() => dispatch(decrement())}>decrement</button>

        </div>
    );
}
