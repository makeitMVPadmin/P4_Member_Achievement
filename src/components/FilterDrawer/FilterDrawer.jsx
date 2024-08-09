import {
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  FormLabel,
  Select,
  DrawerFooter,
  Icon,
  // useToast - will use when user tested and upload successful
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { ChevronDownIcon } from "@chakra-ui/icons";
import uploadIcon from "../../assets/icons/upload-folder-svgrepo-com.png";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./FilterDrawer.scss";

export default function FilterDrawer({ onFilterChange }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [filters, setFilters] = useState({
    type: "",
    level: "",
    estDuration: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilters((filters) => ({
      ...filters,
      [name]: value,
    }));
  };

  const handleFilterChange = (event) => {
    if (location.pathname !== "/resource") {
      navigate("/resource");
    }
    if (typeof onFilterChange === "function") {
      event.preventDefault();
      onFilterChange(filters);
      onClose();
    }
  };

  const handleCancel = () => {
    setFilters({
      type: "",
      level: "",
      estDuration: "",
    });
    onClose();
  };

  return (
    <>
      <button className="filter__button" onClick={onOpen}>
        <SettingsIcon boxSize="1.15rem" className="filter__icon" />
        {/* <Icon as={SettingsIcon} className="filter__icon" /> */}
        <p className="filter__button-name">Filters</p>
      </button>
      <div>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={handleCancel}
          size="sm"
        >
          <DrawerOverlay />
          <DrawerContent
            sx={{
              borderRadius: "30px 0px 0px 30px",
              border: "4px solid black",
            }}
          >
            <DrawerCloseButton
              sx={{ color: "#0099FF", fontSize: "20px", fontWeight: "bolder" }}
            />
            <DrawerHeader>
              <h1 className="submission__header-title">Filter Resources</h1>
            </DrawerHeader>
            <DrawerBody className="submission__form-container">
              <FormLabel
                htmlFor="type"
                marginTop="10px"
                fontSize="20px"
                fontWeight="bold"
                pt={2}
                mb={3}
              >
                Type
              </FormLabel>
              <Select
                id="type"
                name="type"
                value={filters.type}
                onChange={handleChange}
                _hover={{}}
                fontSize="20px"
                icon={<ChevronDownIcon />}
                iconSize="45px"
                iconColor="#0099FF"
                border="3px solid black"
                className="submission__inputField"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Article">Article</option>
                <option value="Course">Course</option>
                <option value="Video">Video</option>
                <option value="All">All</option>
              </Select>
              <FormLabel
                htmlFor="level"
                fontSize="20px"
                fontWeight="bold"
                marginTop="10px"
                pt={2}
                mb={3}
              >
                Skill
              </FormLabel>
              <Select
                id="level"
                name="level"
                value={filters.level}
                onChange={handleChange}
                _hover={{}}
                fontSize="20px"
                icon={<ChevronDownIcon />}
                iconSize="45px"
                iconColor="#0099FF"
                border="3px solid black"
                className="submission__inputField"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All">All</option>
              </Select>
              <FormLabel
                htmlFor="estDuration"
                fontSize="20px"
                fontWeight="bold"
                marginTop="10px"
                pt={2}
                mb={3}
              >
                Duration
              </FormLabel>
              <Select
                id="estDuration"
                name="estDuration"
                value={filters.estDuration}
                onChange={handleChange}
                _hover={{}}
                icon={<ChevronDownIcon />}
                fontSize="20px"
                iconSize="45px"
                iconColor="#0099FF"
                border="3px solid black"
                className="submission__inputField"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="3 min">3 min</option>
                <option value="5 min">5 min</option>
                <option value="7 min">7 min</option>
                <option value="10 min">10 min</option>
                <option value="20 min">20 min</option>
                <option value="30 min">30 min</option>
                <option value="40 min">40 min</option>
                <option value="50 min">50 min</option>
                <option value="60 min">60 min</option>
                <option value="All">All</option>
              </Select>
            </DrawerBody>
            <DrawerFooter>
              <Button
                mr={3}
                bg="white"
                fontSize="18px"
                fontFamily="Poppins"
                padding="6px"
                fontWeight="bold"
                marginTop="20px"
                boxShadow="1px 1px 0px black"
                border="3px solid black"
                color="black"
                _hover={{ bg: "gray.600" }}
                onClick={handleCancel}
                className="submission__form-button"
              >
                Cancel
              </Button>
              <Button
                bg="#0099FF"
                fontSize="18px"
                fontWeight="bold"
                fontFamily="Poppins"
                padding="6px"
                marginTop="20px"
                boxShadow="1px 1px 0px black"
                border="3px solid black"
                color="black"
                _hover={{ bg: "gray.600" }}
                className="submission_form-button"
                type="submit"
                onClick={handleFilterChange}
              >
                Confirm
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
