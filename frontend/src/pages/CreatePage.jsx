import {
    Box,
    Container,
    Heading,
    useColorModeValue,
    useToast,
    VStack,
    Input,
    Button,
  } from "@chakra-ui/react";  // Import Chakra UI components
  import { useState } from "react";
  import { useProductStore } from "../store/product.js";  // Correct import of store

  
  const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
      name: "",
      price: "",
      image: "",
    });
  
    const toast = useToast();
    const { createProduct } = useProductStore();
  
    const handleAddProduct = async () => {
      const { success, message } = await createProduct(newProduct);
  
      if (!success) {
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setNewProduct({ name: "", price: "", image: "" });
      }
    };
  
    return (
      <Container maxW="container.md" py={8}>
        <VStack spacing={6}>
          {/* Page Heading */}
          <Heading as="h1" size="2xl" textAlign="center" mb={4}>
            Create New Product
          </Heading>
  
          {/* Form Container */}
          <Box
            w="full"
            bg={useColorModeValue("white", "gray.700")}
            p={8}
            rounded="lg"
            shadow="lg"
          >
            <VStack spacing={4}>
              {/* Input for Product Name */}
              <Input
                placeholder="Product Name"
                name="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                focusBorderColor="blue.500"
                size="lg"
                variant="filled"
              />
  
              {/* Input for Product Price */}
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                focusBorderColor="blue.500"
                size="lg"
                variant="filled"
              />
  
              {/* Input for Product Image URL */}
              <Input
                placeholder="Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                focusBorderColor="blue.500"
                size="lg"
                variant="filled"
              />
  
              {/* Add Product Button */}
              <Button
                colorScheme="blue"
                size="lg"
                w="full"
                onClick={handleAddProduct}
                _hover={{ bg: "blue.600" }}
              >
                Add Product
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    );
  };
  
  export default CreatePage;
  