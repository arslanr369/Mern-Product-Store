import { Box, Editable, Heading, HStack, IconButton, useColorMode, useColorModeValue, useToast, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, VStack, Input, Button } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { useProductStore } from '../store/product';

function ProductCard({ product }) {
  const [updateProduct, setUpdatedProduct] = useState(product);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProduct, updateProduct: updateProductStore } = useProductStore(); // Include updateProductStore from Zustand store
  const toast = useToast();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updateProduct) => {
    const { success, message } = await updateProductStore(pid, updateProduct); // Call the updateProduct function from Zustand store
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  };

  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <img src={product.image} alt={product.name} height={48} width="100%" style={{ objectFit: 'cover' }} />
      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
          <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {/* Input for Product Name */}
              <Input
                placeholder="Product Name"
                name="name"
                value={updateProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updateProduct, name: e.target.value })}
              />

              {/* Input for Product Price */}
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updateProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updateProduct, price: e.target.value })}
              />

              {/* Input for Product Image URL */}
              <Input
                placeholder="Image URL"
                name="image"
                value={updateProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updateProduct, image: e.target.value })}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleUpdateProduct(product._id, updateProduct)}>
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ProductCard;
