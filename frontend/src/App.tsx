import { Avatar, Box, Button, Flex, HStack, Heading, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Text, Badge, useDisclosure, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, PopoverFooter, Toast, useToast } from '@chakra-ui/react'
import './App.css'
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { BASE_URL } from '../base';
import { useEffect, useState } from 'react';
import { Product } from './model/product';
import RefreshProduct from './components/RefreshProduct';
import ProductForm from './components/ProductForm';
import ProductDetail from './components/ProductDetail';

function App() {

  const {isOpen,onClose,onOpen} = useDisclosure();
  const {isOpen:viewDialogOpen,onClose:viewDialogClose,onOpen:onViewDialogOpen} = useDisclosure();
  const [currentData,setCurrentData] = useState<Product>({} as Product);

  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  useEffect(()=>{
    fetchData();
  },[])



  const fetchData =() => {
    setIsLoading(true);
    axios.get(BASE_URL+"product").then((response) => {
      setData(response.data);
    }).catch((error) => {
      console.log(error);
    }).finally(()=>{
      setIsLoading(false);
    })
  }


  const getProduct = (id:number)=>{
    axios.get<Product>(BASE_URL+"product/"+id)
    .then((res)=>{
      console.log(res);
      setCurrentData(res.data);

      onOpen();

    }).catch((err)=>{
      console.log(err);
    })
  }


  const handleAdd =() =>{
    onOpen();
    setCurrentData({} as Product)
  }


  const onDeleteHandle = (id:number)=>{
   axios.delete(BASE_URL+"product/"+id).then(() => {
     toast({
      title: "Product deleted",
      description: "Product deleted successfully",
      isClosable: true,
      duration: 1200,
     })

     fetchData();
    }).catch((err) =>
     console.log(err)
   )
  }

  const handleViewDetail = (id:number)=>{
    axios.get<Product>(BASE_URL+"product/"+id)
    .then((res)=>{
      setCurrentData(res.data)
      onViewDialogOpen();
    }).catch((err)=>{
      console.log(err)
    })
  }



  
  if(isLoading) return <RefreshProduct/>

  return (
    <Box 
    shadow={'md'}
    rounded={'md'}
    m={32}>

      <Flex 
      px="5"
      justifyContent={"space-between"}
      alignItems={'center'}
      mb={5}>
        

        <Heading
        fontSize="20">
          Product List
        </Heading>

        <Button
        colorScheme='blue'
        leftIcon={<AddIcon/>}
        onClick={()=>handleAdd()}
        >
          Add Product
        </Button>
      </Flex>
          <TableContainer>
  <Table variant='striped'>
    <Thead>
      <Tr>
        <Th>Id</Th>
        <Th>Name</Th>
        <Th>Description</Th>
        <Th>Available</Th>
        <Th isNumeric>Price</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>
    <Tbody>
      {data?.map((product:Product)=>(
          <Tr key={product.id}>
        <Td>{product.id}</Td>
        <Td>
          <HStack>
            <Avatar size="sm" name={product.name}/>
            <Text>{product.name}</Text>
          </HStack>
        </Td>
        <Td>{product.description}</Td>
        <Td>
           <Badge>
           {product.isAvailable ? 'Yes':'No'}
           </Badge>
        </Td>
        <Td isNumeric>{product.price}</Td>
        <Td>
          <HStack gap={3}>
            <EditIcon 
             onClick={()=>getProduct(product.id)}
            boxSize={22} color={'green'}/>
            <Popover>
            <PopoverTrigger>
              <DeleteIcon color={'red'} boxSize={22}/>
            </PopoverTrigger>
            <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Confirmation!</PopoverHeader>
            <PopoverBody>
              Are you sure you delete this?
            </PopoverBody>
            <PopoverFooter>
              <Button 
              colorScheme='red'
              onClick={()=>onDeleteHandle(product.id)}
              float={'right'}>Delete</Button>
            </PopoverFooter>
            </PopoverContent>
            </Popover>
            <ViewIcon
            onClick={()=>handleViewDetail(product.id)}
             color={'deepskyblue'} boxSize={22}/>
          </HStack>
        </Td>
      </Tr>
      ))}
      
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>asp.net & React</Th>
        <Th>Imad Ettamen</Th>
        <Th isNumeric>Full stack App</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>

  {
    data?.length ==0 && (<Heading textAlign={'center'} p='5' fontSize={14}>
      No Data
    </Heading>
  )}

    {isOpen && <ProductForm
        currentData={currentData}
        fetchProduct={fetchData}
        isOpen={isOpen}
        onClose={onClose}
      />}


      {viewDialogOpen && <ProductDetail 
         isOpen={viewDialogOpen}
         onClose={viewDialogClose}
         currentData={currentData}
         />}

      </Box>
    );
  }

export default App
