import {ListsIcon} from "../../../../../icons";
import {mountWithStore} from "../../../../../util/testHelper";
import UserItemAction from "../UserItemAction";

describe("UserItemAction", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserItemAction title={"View Lists"} icon={ListsIcon}/>);
        expect(wrapper.text().includes("View Lists")).toBe(true);
    });
});
