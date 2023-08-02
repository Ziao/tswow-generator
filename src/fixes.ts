// This file contains a few the fixes that make the ts files import properly
// The contents are appended per module to the top of the file
// If during conversion, you run into "Cannot find name" errors, add the name here
// The values or their types don't actually matter. We do not use those values in our definitions

export const fixes: Record<string, string> = {
    CalendarConstants: `
        const Get = 0
    `,

    CharacterCustomizationShared: `
        const CustomOptionTattoo = 0;
        const CustomOptionTattooColor = 0;
        const Constants = { 
            CharCustomizationConstants: { 
                CHAR_CUSTOMIZE_CUSTOM_DISPLAY_OPTION_LAST: 1, 
                CHAR_CUSTOMIZE_CUSTOM_DISPLAY_OPTION_FIRST: 0 
            } 
        };
    `,

    CurrencyConstants: `
        const Enum = { 
            PlayerCurrencyFlagsDbFlags: { 
                InBackpack: 0, 
                UnusedInUI: 0 
            } 
        }`,

    ItemConstants_Mainline: `
        const NUM_BAG_SLOTS = 0;
        const BANK_NUM_GENERIC_SLOTS = 0;
        const NUM_BANKBAG_SLOTS = 0;
        const NUM_REAGENTBAG_SLOTS = 0;
    `,
};
