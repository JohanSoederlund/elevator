import * as React from "react";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Infromation extends React.Component {

    constructor() {
        super();
        this.state = {
            information: ""
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.information !== this.props.information){
            this.setState({information: nextProps.information});
        }
    }

    public render() {
        return (
            <div>
                <Card className="card">
                    <CardHeader
                        title="Information Panel"
                        subheader="Elevators latest action"
                    />
                    <CardContent>
                        <Typography paragraph>
                            {this.state.information}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default Infromation;

