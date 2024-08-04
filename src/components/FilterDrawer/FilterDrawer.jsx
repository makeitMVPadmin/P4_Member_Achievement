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
import { useState } from "react";
import "./FilterDrawer.scss"

export default function FilterDrawer({ onFilterChange }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [filters, setFilters] = useState({
        type: "",
        skill: "",
        duration: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFilters(filters => ({
            ...filters,
            [name]: value
        }));

        console.log(name, value);
    }

    const handleFilterChange = (event) => {
        event.preventDefault();
        onFilterChange(filters);
        onClose();
    };

    const handleCancel = () => {
        setFilters({
            type: "",
            skill: "",
            duration: ""
        })
        onClose();
    }

    return (
        <>
            <button className="filter__button" onClick={onOpen}>
                <SettingsIcon boxSize="1.15rem" className="filter__icon" />
                {/* <Icon as={SettingsIcon} className="filter__icon" /> */}
                <p className="filter__button-name">Filter Options</p>
            </button>
            <div>
                <Drawer isOpen={isOpen} placement="left" onClose={handleCancel} size="sm">
                    <DrawerOverlay />
                    <DrawerContent
                        sx={{
                            borderRadius: "0px 30px 30px 0px",
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
                                fontSize="20px"
                                fontWeight="bold"
                                pt={2}
                                mb={0}
                            >Type</FormLabel>
                            <Select
                                id="type"
                                name="type"
                                value={filters.type}
                                onChange={handleChange}
                            >
                                <option value="" disabled >Select</option>
                                <option value="Article">Article</option>
                                <option value="Course">Course</option>
                                <option value="Video">Video</option>
                                <option value="All">All</option>
                            </Select>
                            <FormLabel
                                htmlFor="skill"
                                fontSize="20px"
                                fontWeight="bold"
                                pt={2}
                                mb={0}
                            >Skill</FormLabel>
                            <Select
                                id="skill"
                                name="skill"
                                value={filters.skill}
                                onChange={handleChange}
                            >
                                <option value="" disabled >Select</option>
                                <option value="Beginner Level">Beginner</option>
                                <option value="Intermediate Level">Intermediate</option>
                                <option value="Advanced Level">Advanced</option>
                                <option value="All">All</option>
                            </Select>
                            <FormLabel
                                htmlFor="duration"
                                fontSize="20px"
                                fontWeight="bold"
                                pt={2}
                                mb={0}
                            >Duration</FormLabel>
                            <Select
                                id="duration"
                                name="duration"
                                value={filters.duration}
                                onChange={handleChange}
                            >
                                <option value="" disabled >Select</option>
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
    )
}
