import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Details } from './Details';
import { Update } from './Update';

function Profile({ match }) {
    const { path } = match;
    console.log("profile path", path);
    return (
        <div className="p-4">
            <div className="container">
                <Switch>
                    <Route exact path={`${path}/profile`} component={Details} />
                    <Route path={`${path}/update`} component={Update} />
                </Switch>
            </div>
        </div>
    );
}

export { Profile };