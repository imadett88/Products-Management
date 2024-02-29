import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, VStack, Text, Switch, useToast } from "@chakra-ui/react"
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../base";
import { Product } from "../model/product";


type ProductFormProps = {
    isOpen: boolean;
    onClose: ()=> void;
    fetchProduct:()=>void;
    currentData?: Product
}
const ProductForm = ({isOpen,onClose,fetchProduct,currentData}:ProductFormProps) => {

    const toast = useToast()
    const [product,setProducts] = useState({
        id:currentData?.id || 0,
        name:currentData?.name || '',
        description:currentData?.description || '',
        price:currentData?.price || 0,
        isAvailable:currentData?.isAvailable || false
    });


    const onSave = () => {
      
        if(currentData?.id){
            editProduct();
        }else{
            addProduct();
        }
    }

    const editProduct = () => {
        axios.put(BASE_URL+"product/"+currentData?.id,product).then((res)=>{
            onClose();
            fetchProduct();
    
            toast({
                title: "Product Updated",
                description: "Product Updated successfully",
                isClosable: true,
                duration: 1200
            })
    
           }).catch((err)=>{
            console.log(err);
    
           })
    }

    const addProduct = () => {
        axios.post(BASE_URL+"product",product).then((res)=>{
            onClose();
            fetchProduct();
    
            toast({
                title: "Product Added",
                description: "Product Added successfully",
                isClosable: true,
                duration: 1200
            })
    
           }).catch((err)=>{
            console.log(err);
    
           })
    }

    return (
          <>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader
                shadow={'sm'}
                >Add Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack gap={4} alignItems={'self-start'}>
                  <Input type="text"
                   placeholder="Name"
                    value={product.name}
                    onChange={(e)=>setProducts({...product,name:e.target.value})}/>
                  <Textarea
                   placeholder="Product Description"
                   value={product.description}
                    onChange={(e)=>setProducts({...product,description:e.target.value})}/>
                  <Input type="number"
                   value={product.price}
                   onChange={(e)=>
                    setProducts({...product,price: parseInt(e.target.value)})}
                   placeholder="Price"/>
                   <Text>
                    is Available
                   </Text>
                   <Switch isChecked={product.isAvailable}
                   onChange={(e)=>setProducts({...product,isAvailable:e.target.checked})}/>
                  </VStack>
                </ModalBody>
      
                <ModalFooter>
                    {/* {JSON.stringify(product)} */}
                  <Button variant={'ghost'} mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme="blue" 
                  onClick={onSave}>
                    Save
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
    );
}


export default ProductForm
