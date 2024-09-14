import { Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5"; // Corrected import
import { LuSun } from "react-icons/lu";  // Corrected import
import { PlusSquareIcon } from "@chakra-ui/icons";  // Correct import for the icon
import { Link } from "react-router-dom";  // Corrected usage of <Link>

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();  // Corrected toggleColorMode function

  return (
    <Container maxW={"1140px"} px={"4"}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        {/* Brand Text */}
        <Text
          fontSize={{ base: "22px", sm: "28px" }}  // Corrected to fontSize
          fontWeight={"bold"}  // Corrected to fontWeight
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to="/">Product Store</Link>  {/* Corrected to use <Link> */}
        </Text>

        {/* Icon Buttons */}
        <HStack spacing={2} alignItems={"center"}>
          <Link to="/Create">
            <button>
              <PlusSquareIcon fontSize={20} />
            </button>
          </Link>
          <button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon size="20" /> : <LuSun size="20" />} {/* Proper size setting */}
          </button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
