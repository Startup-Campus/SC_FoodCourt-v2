import useThemeColor from "@/hooks/useThemeColor";
import { Addon } from "@/types";
import { ListItem } from "@rneui/themed";
import { useState } from "react";

const MenuItemAddons = ({ addons, placeAddOn, selectedAddon }: { 
    addons: Addon[],
    placeAddOn: (data: { name: string, price: number }|null) => any ,
    selectedAddon: any,
}) => {
    const [expanded, setExpanded] = useState(false);
    const primary = useThemeColor({}, "primary");

    return (
        <ListItem.Accordion
            content={
                <ListItem.Content>
                    <ListItem.Title style={{ color: primary }}>
                        Add Ons
                    </ListItem.Title>
                </ListItem.Content>
            }
            isExpanded={expanded}
            onPress={() => setExpanded(!expanded)}
        >
            {
                addons?.map((item) => (
                    <ListItem key={item.foodName} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>{item.foodName}</ListItem.Title>
                            <ListItem.Subtitle>{item.price}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.CheckBox
                            checked={selectedAddon && selectedAddon.name === item.foodName}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checkedColor={primary}
                            onPress={() => placeAddOn({ name: item.foodName, price: item.price })}

                        />
                    </ListItem>
                ))
            }
        </ListItem.Accordion>
    )
}

export default MenuItemAddons