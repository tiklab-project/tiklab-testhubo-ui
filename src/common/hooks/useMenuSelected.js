import {useEffect, useState} from "react";

export const useMenuSelected = () => {
    const [menuSelected, setMenuSelected] = useState(() => {
        const storedValue = localStorage.getItem("leftRouter");
        return storedValue || "/home";
    });

    useEffect(() => {
        localStorage.setItem("leftRouter", menuSelected);
    }, [menuSelected]);

    return [menuSelected, setMenuSelected];
};
