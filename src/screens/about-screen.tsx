import React from 'react';
import {Box, Text, VStack, ScrollView, Icon, Image, useColorModeValue} from 'native-base';
import {Feather} from '@expo/vector-icons';
import AnimatedColorBox from '../components/animated-color-box';
import NavBar from '../components/navbar';
import MastHead from '../components/masthead';
import LinkButton from '../components/link-button';

const AboutScreen = () => {
  return (
    <AnimatedColorBox flex={1} bg={useColorModeValue('warmGray.50', 'warmGray.900')} w="full">
      <MastHead title="About this app" image={require('../assets/about-masthead.jpg')}>
        <NavBar />
      </MastHead>
      <ScrollView borderTopLeftRadius="20px" borderTopRightRadius="20px" bg={useColorModeValue('warmGray.50', 'primary.900')} mt="-20px" pt="30px" p={4}>
        <VStack flex={1} space={4}>
          <Box alignItems="center">
            <Image source={require('../assets/about.png')} borderRadius="full" resizeMode="cover" w={120} h={120} alt="author" /> 
            <Text  fontSize="md" w="full" textAlign="center">About</Text>
          </Box>
          <LinkButton colorScheme="red" size="lg" borderRadius="full" href="https://github.com/canadaprogrammer/rn-inkdrop" leftIcon={<Icon as={Feather} name="github" size="sm" opacity={0.5} />}>Go To GitHub Repository</LinkButton>
          <LinkButton colorScheme={useColorModeValue('blue', 'darkBlue')} size="lg" borderRadius="full" href="mailto:jinpark1504@gmail.com" leftIcon={<Icon as={Feather} name="mail" size="sm" opacity={0.5} />}>E-mail</LinkButton>
        </VStack>
      </ScrollView>
    </AnimatedColorBox>
  );
};

export default AboutScreen;