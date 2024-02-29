import { Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Text, DrawerFooter, HStack, Avatar, Heading, VStack } from "@chakra-ui/react"
import { Product } from "../model/product";


type ViewDetailsProps = {
  isOpen:boolean;
  onClose:()=>void;
  currentData:Product
}


  
  
  
  const ViewDetail = ({
    isOpen,
    onClose,
    currentData

  }: ViewDetailsProps) => {
    
    
    return (
      <>

        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
               Details of {currentData.name}
            </DrawerHeader>
  
            <DrawerBody>
              <HStack>
                <Avatar name={currentData.name} size={'lg'}/>
                <VStack
                alignItems={'self-start'}
                >
                <Heading fontSize={16}>
                  {currentData.name}
                </Heading>
                $<Heading fontSize={20}>
                  {currentData.price}
                </Heading>
                <Text>
                  {currentData.description}
                </Text>
                </VStack>
              </HStack>
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }
export default ViewDetail
