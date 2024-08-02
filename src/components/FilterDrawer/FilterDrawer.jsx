import {
    Button,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Stack,
    Box,
    FormLabel,
    Input,
    Select,
    Textarea,
    DrawerFooter,
    FormControl,
    FormErrorMessage,
    // useToast - will use when user tested and upload successful
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { collection, addDoc } from "firebase/firestore";
import { storage, database } from "../../config/firebase";
import "./FilterDrawer.scss"

export default function FilterDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleCancel = () => {
        onClose();
    }

    return (
        <>
            <button className="filter__button" onClick={onOpen}>
                {/* <div className="filter__empty-div"></div> */}
                <SettingsIcon boxSize="1.4rem" />
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
                            <p className="submission__small-text">
                                <span>*</span> Required
                            </p>
                        </DrawerHeader>

                    </DrawerContent>
                </Drawer>
            </div>
        </>
    )
}
