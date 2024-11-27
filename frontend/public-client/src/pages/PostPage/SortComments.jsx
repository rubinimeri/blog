import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import PropTypes from "prop-types";

function SortComments({ handleSortComments }) {
  return (
    <Select onValueChange={handleSortComments}>
      <SelectTrigger className="w-[150px] max-md:w-[100px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">Oldest</SelectItem>
        <SelectItem value="desc">Newest</SelectItem>
        <SelectItem value="likes">Likes</SelectItem>
      </SelectContent>
    </Select>
  );
}

SortComments.propTypes = {
  handleSortComments: PropTypes.func,
};

export default SortComments;
