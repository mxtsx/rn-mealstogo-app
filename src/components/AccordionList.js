import * as React from 'react';
import { List } from 'react-native-paper';

export const AccordionList = ({title, expanded, setExpanded, items, left}) => {

    const handlePress = () => setExpanded(!expanded);

    return (
            <List.Accordion
                title={title}
                left={left}
                expanded={expanded}
                onPress={handlePress}>
                {items.map(i => <List.Item key={i.key} title={i.title}/>)}
            </List.Accordion>
    );
};
