
import React from 'react';
import './index.less';
import Wave from 'react-wavify';

export function CounterMobile({ soldCount, keyValue,totalCount  }) {

    return (

        <div className="sold-counter-mobile" id={"counter-"+keyValue} key={keyValue}>
            <Wave fill='#eabe00'
                id={keyValue}
                // paused={animateCounter}
                options={{
                    height: soldCount === 0 ? 70 : 70 - (70 * (soldCount / totalCount)),
                    speed: 0.5,
                    points: 1
                }}
            />
            <Wave fill='#ffcf00'
                id={keyValue}
                // paused={animateCounter}
                options={{
                    height: soldCount === 0 ? 70 : 70 - (70 * (soldCount / totalCount)),
                    speed: 0.5,
                    points: 2
                }}
            />

            <h5 className="sold-cnt">{soldCount}</h5>

            <p>SOLD <br />
                OUT OF
            </p>

            <h5 className="total-cnt">{totalCount}</h5>
        </div>

    );
}
export const MemoizedCounterMobile = React.memo(CounterMobile);
// export { CounterMobile };