import { Box, Flex, Switch, useColorMode } from '@chakra-ui/react';

export const DarkModeSwitch = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    return (
        <Flex justifyContent="end" width="100vw">
            <Box pt="1rem" pr="1rem" ml="auto">
                {isDark ? '🌚' : '🌝'}
                <Switch pl="3" color="green" isChecked={isDark} onChange={toggleColorMode} />
            </Box>
        </Flex>
    );
};
