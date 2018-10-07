
import {Character} from "./character";
//import TacticsDraw from "./tacticsdraw";

export const CHARACTERS: Character[] = [
    {
        "id" : 0,
        "name" : "Laura Roslin",
        "type" : "Political Leader",
        "admiralInheritance" : 26,
        "cagInheritance" : 26,
        "presidentInheritance" : 1,
        "set" : "Base",
        "startLocation" : "President's Office",
        "oncePerTurnTitle" : "Religious Visions",
        "oncePerTurnText" : "When you draw Crisis Cards, draw 2 and choose 1 to resolve. Place the other on the bottom of the deck.",
        "oncePerGameTitle" : "Skilled Politician",
        "oncePerGameText" : "Action: Once per game, draw 4 Quorum Cards. Choose 1 to resolve and place the rest on the bottom of the deck. You do not need to be President to use this ability.",
        "weaknessTitle" : "Terminal Illness",
        "weaknessText" : "In order to activate a location, you must first discard 2 Skill Cards.",
        "loyaltyWeight" : 1,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Politics",
                "amount" : 3 
            },
            {
                "sphere" : "Leadership",
                "amount" : 2 
            } 
        ]
    },
    {
        "id" : 1,
        "name" : "Gaius Baltar",
        "type" : "Political Leader",
        "admiralInheritance" : 23,
        "cagInheritance" : 23,
        "presidentInheritance" :2,
        "set" : "Base",
        "startLocation" : "Research Lab",
        "oncePerTurnTitle" : "Delusional Intuition",
        "oncePerTurnText" : "After you draw a Crisis Card, draw 1 Skill Card of your choice (it may be from outside your skill set).",
        "oncePerGameTitle" : "Cylon Detector",
        "oncePerGameText" : "Action: Once per game, you may look at all Loyalty Cards belonging to another player.",
        "weaknessTitle" : "Coward",
        "weaknessText" : "You start the game with 2 Loyalty Cards (instead of 1).",
        "loyaltyWeight" : 2,
        "alternateOf" : 28,
        "draws" : [
            {
                "sphere" : "Politics",
                "amount" : 2 
            },
            {
                "sphere" : "Leadership",
                "amount" : 1 
            },
            {
                "sphere" : "Engineering",
                "amount" : 1
            }
        ]
    },
    {
        "id" : 2,
        "name" : "Tom Zarek",
        "type" : "Political Leader",
        "admiralInheritance" : 20,
        "cagInheritance" : 20,
        "presidentInheritance" : 4,
        "set" : "Base",
        "startLocation" : "Admininistration",
        "oncePerTurnTitle" : "Friends in Low Places",
        "oncePerTurnText" : "When a player activates the \"Administration\" or the \"Brig\" location, you may choose to reduce or increase the difficulty by 2.",
        "oncePerGameTitle" : "Unconventional Tactics",
        "oncePerGameText" : "Action: Once per game, lose 1 population to gain 1 of any other resource type.",
        "weaknessTitle" : "Convicted Criminal",
        "weaknessText" : "You may not activate locations occupied by other characters (except the \"Brig\").",
        "loyaltyWeight" : 1,
        "alternateOf" : 21,
        "draws" : [
            {
                "sphere" : "Politics",
                "amount" : 2 
            },
            {
                "sphere" : "Leadership",
                "amount" : 2 
            },
            {
                "sphere" : "Tactics",
                "amount" : 1
            }
        ]
    },
    {
        "id" : 3,
        "name" : "William Adama",
        "type" : "Military Leader",
        "admiralInheritance" : 2,
        "cagInheritance" : 10,
        "presidentInheritance" : 11,
        "set" : "Base",
        "startLocation" : "Admiral's Quarters",
        "oncePerTurnTitle" : "Inspirational Leader",
        "oncePerTurnText" : "When you draw a Crisis Card, all 1 strength Skill Cards count positive for the skill check.",
        "oncePerGameTitle" : "Command Authority",
        "oncePerGameText" : "Once per game, after resolving a skill check, instead of discarding the used Skill Cards, draw them into your hand.",
        "weaknessTitle" : "Emotionally Attached",
        "weaknessText" : "You may not activate the \"Admiral's Quarters\" location.",
        "loyaltyWeight" : 1,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Leadership",
                "amount" : 3 
            },
            {
                "sphere" : "Tactics",
                "amount" : 2 
            } 
        ]
    },
    {
        "id" : 4,
        "name" : "Saul Tigh",
        "type" : "Military Leader",
        "admiralInheritance" : 3,
        "cagInheritance" : 12,
        "presidentInheritance" : 22,
        "set" : "Base",
        "startLocation" : "Command",
        "oncePerTurnTitle" : "Cylon Hatred",
        "oncePerTurnText" : "When a player activates the \"Admiral's Quarters\" location, you may choose to reduce the difficulty by 3.",
        "oncePerGameTitle" : "Declare Martial Law",
        "oncePerGameText" : "Action: Once per game, give the President title to the Admiral.",
        "weaknessTitle" : "Alcoholic",
        "weaknessText" : "At the start of any player turn, if you have exactly 1 Skill Card in your hand, you must discard it.",
        "loyaltyWeight" : 1,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Leadership",
                "amount" : 2 
            },
            {
                "sphere" : "Tactics",
                "amount" : 3 
            } 
        ]
    },
    {
        "id" : 5,
        "name" : "Karl \"Helo\" Agathon",
        "type" : "Military Leader",
        "admiralInheritance" : 4,
        "cagInheritance" : 9,
        "presidentInheritance" : 12,
        "set" : "Base",
        "startLocation" : "",
        "oncePerTurnTitle" : "ECO Officer",
        "oncePerTurnText" : "During your turn, you may reroll a die that was just rolled (once per turn). You must use the new result.",
        "oncePerGameTitle" : "Moral Compass",
        "oncePerGameText" : "Once per game, after a player makes a choice on a Crisis Card, you may change it.",
        "weaknessTitle" : "Stranded",
        "weaknessText" : "Your character is not placed on the game board at the start of the game. While not on the game board, you may not move, be moved or take actions. At the start of your 2nd turn, place your character on the \"Hangar Deck\" location.",
        "loyaltyWeight" : 1,
        "alternateOf" : 25,
        "draws" : [
            {
                "sphere" : "Leadership",
                "amount" : 2 
            },
            {
                "sphere" : "Tactics",
                "amount" : 2 
            },
            {
                "sphere" : "Piloting",
                "amount" :1    
            }
        ]
    },
    {
        "id" : 6,
        "name" : "Kara \"Starbuck\" Thrace",
        "type" : "Pilot",
        "admiralInheritance" : 11,
        "cagInheritance" : 2,
        "presidentInheritance" : 25,
        "set" : "Base",
        "startLocation" : "Hangar Deck",
        "oncePerTurnTitle" : "Expert Pilot",
        "oncePerTurnText" : "When you start your turn piloting a viper, you may take 2 actions during your Action Step (instead of 1).",
        "oncePerGameTitle" : "Secret Destiny",
        "oncePerGameText" : "Once per game, immediately after a Crisis Card is revealed, discard it and draw a new one.",
        "weaknessTitle" : "Insubordinate",
        "weaknessText" : "When a player chooses you with the \"Admiral's Quarters\" location, reduce the difficulty by 3.",
        "loyaltyWeight" : 1,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Tactics",
                "amount" : 2 
            },
            {
                "sphere" : "Piloting",
                "amount" : 2 
            },
            {
                "sphere" : "Leadership/Engineering",
                "amount" : 1
            }
        ]
    },
    {
        "id" : 7,
        "name" : "Lee \"Apollo\" Adama",
        "type" : "Pilot",
        "admiralInheritance" : 8,
        "cagInheritance" : 1,
        "presidentInheritance" : 8,
        "set" : "Base",
        "startLocation" : "Launch piloting a viper",
        "oncePerTurnTitle" : "Alert Viper Pilot",
        "oncePerTurnText" : "When a viper is placed in a space area from the \"Reserves\", you may choose to pilot it and take 1 action. You may only do this when you are on a Galactica location, excluding the \"Brig\".",
        "oncePerGameTitle" : "CAG",
        "oncePerGameText" : "Action: Once per game, you may activate up to 6 unmanned vipers.",
        "weaknessTitle" : "Headstrong",
        "weaknessText" : "When you are forced to discard Skill Cards, you must discard randomly.",
        "loyaltyWeight" : 1,
        "alternateOf" : 23,
        "draws" : [
            {
                "sphere" : "Tactics",
                "amount" : 1 
            },
            {
                "sphere" : "Piloting",
                "amount" : 2 
            },
            {
                "sphere" : "Leadership/Politics",
                "amount" : 2
            } 
        ]
    },
    {
        "id" : 8,
        "name" : "Sharon \"Boomer\" Valerii",
        "type" : "Pilot",
        "admiralInheritance" : 13,
        "cagInheritance" : 5,
        "presidentInheritance" : 21,
        "set" : "Base",
        "startLocation" : "Armory",
        "oncePerTurnTitle" : "Recon",
        "oncePerTurnText" : "At the end of your turn, you may look at the top card of the Crisis Card deck and place it on the top or bottom.",
        "oncePerGameTitle" : "Mysterious Intuition",
        "oncePerGameText" : "Once per game, before resolving a skill check on a Crisis Card, choose the result (Pass or Fail), instead of resolving it normally.",
        "weaknessTitle" : "Sleeper Agent",
        "weaknessText" : "During the Sleeper Agent Phase, you are dealt 2 Loyalty Cards (instead of 1) and then moved to the \"Brig\" location.",
        "loyaltyWeight" : 2,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Tactics",
                "amount" : 2 
            },
            {
                "sphere" : "Piloting",
                "amount" : 2 
            },
            {
                "sphere" : "Engineering",
                "amount" : 1
            }
        ]
    },
    {
        "id" : 9,
        "name" : "\"Chief\" Galen Tyrol",
        "type" : "Support",
        "admiralInheritance" : 16,
        "cagInheritance" : 17,
        "presidentInheritance" : 13,
        "set" : "Base",
        "startLocation" : "Hangar Deck",
        "oncePerTurnTitle" : "Maintenance Engineer",
        "oncePerTurnText" : "During your turn, after you use a \"Repair\" Skill Card, you may take another action (once per turn).",
        "oncePerGameTitle" : "Blind Devotion",
        "oncePerGameText" : "Once per game, after cards have been added to a Skill Check (but before revealing them), you may choose a skill type. All cards of the chosen type are considered strength 0.",
        "weaknessTitle" : "Reckless",
        "weaknessText" : "Your hand limit is 8 (instead of 10).",
        "loyaltyWeight" : 1,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Politics",
                "amount" : 1 
            },
            {
                "sphere" : "Leadership",
                "amount" : 2 
            },
            {
                "sphere" : "Engineering",
                "amount" : 2
            }
        ]
    },
    {
        "id" : 10,
        "name" : "Ellen Tigh",
        "type" : "Political Leader",
        "admiralInheritance" : 21,
        "cagInheritance" : 21,
        "presidentInheritance" : 7,
        "set" : "Pegasus",
        "startLocation" : "Admiral's Quarters",
        "oncePerTurnTitle" : "Politically Adroit",
        "oncePerTurnText" : "When you end your Movement step in the same location as another human player, you may give that player 1 Skill Card from your hand to draw 2 Skill Cards.",
        "oncePerGameTitle" : "Manipulative",
        "oncePerGameText" : "Once per game, you may take the Admiral or President title at the start of your turn. Return that title to its previous owner at the end of your turn.",
        "weaknessTitle" : "Nothing But Trouble",
        "weaknessText" : "Your Skill set includes Treachery (Human players can't use text abilities of Treachery Cards).",
        "loyaltyWeight" : 1,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Politics",
                "amount" : 2 
            },
            {
                "sphere" : "Leadership",
                "amount" : 2 
            },
            {
                "sphere" : "Treachery",
                "amount" : 1
            }
        ]
    },
    {
        "id" : 11,
        "name" : "Helena Cain",
        "type" : "Military Leader",
        "admiralInheritance" : 1,
        "cagInheritance" : 11,
        "presidentInheritance" : 17,
        "set" : "Pegasus",
        "startLocation" : "Pegasus CIC or Command",
        "oncePerTurnTitle" : "Intolerant",
        "oncePerTurnText" : "When an \"Admiral's Quarters\" Skill check is passed with 10 or more, you may choose to execute that character instead of sending him to the \"Brig\".",
        "oncePerGameTitle" : "Blind Jump",
        "oncePerGameText" : "Action: Once per game, if at 6 or less distance, draw 2 civilian ships and destroy them to immediately jump the fleet (even if the fleet marker is on a red space). The Admiral only draws 1 Destination Card.",
        "weaknessTitle" : "Bent on Reveng",
        "weaknessText" : "You may not activate the \"FTL Control\" or \"Engine Room\" locations.",
        "loyaltyWeight" : 1,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Leadership",
                "amount" : 2 
            },
            {
                "sphere" : "Tactics",
                "amount" : 2 
            },
            {
                "sphere" : "Tactics/Leadership",
                "amount" : 1
            } 
        ]
    },
    {
        "id" : 12,
        "name" : "Louanne \"Kat\" Katraine",
        "type" : "Pilot",
        "admiralInheritance" : 12,
        "cagInheritance" : 3,
        "presidentInheritance" : 26,
        "set" : "Pegasus",
        "startLocation" : "Hangar Deck",
        "oncePerTurnTitle" : "Hotshot",
        "oncePerTurnText" : "When you would roll a die during your Action step, you may instead discard a Skill Card. Use the card's strength +2 instead of the die roll.",
        "oncePerGameTitle" : "Sacrifice",
        "oncePerGameText" : "Action: Once per game, while piloting a viper, send yourself to \"Sickbay\" to destroy 5 raiders, 2 heavy raiders, 1 basestar or 1 civilian ship in your space area.",
        "weaknessTitle" : "Stim Junkie",
        "weaknessText" : "At the end of your Movement step, if you are in the same location or space area that you were in at the start of your turn, you are moved to \"Sickbay\".",
        "loyaltyWeight" : 1,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Leadership",
                "amount" : 1 
            },
            {
                "sphere" : "Tactics",
                "amount" : 2 
            },
            {
                "sphere" : "Piloting",
                "amount" : 2
            }
        ]
    },
    {
        "id" : 13,
        "name" : "Anastasia \"Dee\" Dualla",
        "type" : "Support",
        "admiralInheritance" : 9,
        "cagInheritance" : 14,
        "presidentInheritance" : 18,
        "set" : "Pegasus",
        "startLocation" : "Communications",
        "oncePerTurnTitle" : "Efficient",
        "oncePerTurnText" : "When you activate the \"Communications\" location, you may look at every civilian ship on the game board and may move any number of them.",
        "oncePerGameTitle" : "Fast Learner",
        "oncePerGameText" : "Once per game, before making a Skill check, look at the top 3 cards of any SKill deck (even outside your Skill set), and add all of them to either the Skill check or your hand.",
        "weaknessTitle" : "Emotionally Fragile",
        "weaknessText" : "When morale is reduced to 2 or less, you are executed. If you are human, do not lose 1 morale.",
        "loyaltyWeight" : 1,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Leadership",
                "amount" : 1 
            },
            {
                "sphere" : "Tactics",
                "amount" : 3 
            },
            {
                "sphere" : "Engineering",
                "amount" : 1
            }
        ]
    },
    {
        "id" : 14,
        "name" : "Caprica Six",
        "type" : "Cylon Leader",
        "admiralInheritance" : 100,
        "cagInheritance" : 100,
        "presidentInheritance" : 100,
        "set" : "Pegasus",
        "startLocation" : "Caprica",
        "oncePerTurnTitle" : "Intimate",
        "oncePerTurnText" : "Movement: Draw a Skill card at random from a player's hand. Then, that player draws 1 card from the skill deck of your choice (it may be from outside their skill set).",
        "oncePerGameTitle" : "Human Delusion",
        "oncePerGameText" : "Once per game, after all Skill Cards played into a skill check have been revealed, you may play any number of Skill Cards from your hand into the check.",
        "weaknessTitle" : "Conflicted Loyalties",
        "weaknessText" : "You must discard 1 Skill Card to activate the \"Cylon Fleet\" location.",
        "loyaltyWeight" : 0,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Leadership",
                "amount" : 1 
            },
            {
                "sphere" : "Treachery/Engineering",
                "amount" : 1 
            } 
        ]
    },
    {
        "id" : 15,
        "name" : "Leoben Conoy",
        "type" : "Cylon Leader",
        "admiralInheritance" : 100,
        "cagInheritance" : 100,
        "presidentInheritance" : 100,
        "set" : "Pegasus",
        "startLocation" : "Human Fleet",
        "oncePerTurnTitle" : "Glimpse the Face of God",
        "oncePerTurnText" : "Movement: Draw 2 cards from the top of the Destiny deck, then place 2 cards from your hand on top of the Destiny deck.",
        "oncePerGameTitle" : "Cryptic Message",
        "oncePerGameText" : "Action: Once per game, exchange your hand of Skill Cards with another player's hand of Skill Cards.",
        "weaknessTitle" : "Clouded",
        "weaknessText" : "You may not voluntarily move to a location that contains another character.",
        "loyaltyWeight" : 0,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Politics",
                "amount" : 1 
            },
            {
                "sphere" : "Treachery/Engineering",
                "amount" : 1 
            } 
        ]
    },
    {
        "id" : 16,
        "name" : "Cavil",
        "type" : "Cylon Leader",
        "admiralInheritance" : 100,
        "cagInheritance" : 100,
        "presidentInheritance" : 100,
        "set" : "Pegasus",
        "startLocation" : "Cylon Fleet",
        "oncePerTurnTitle" : "Primacy",
        "oncePerTurnText" : "Action: Place 1 basestar in front of Galactica, or if all basestars are in play, you may remove 1 from the game board. You may then place 3 raiders in front of Galactica and 1 civilian ship behind Galactica.",
        "oncePerGameTitle" : "Aggressive Tactics",
        "oncePerGameText" : "Movement: Once per game you may take 2 Actions.",
        "weaknessTitle" : "Lies and Secrets",
        "weaknessText" : "When a player reveals a \"You are a Cylon\" Loyalty Card, you must discard all Skill Cards in your hand.",
        "loyaltyWeight" : 0,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Tactics",
                "amount" : 1 
            },
            {
                "sphere" : "Treachery/Engineering",
                "amount" : 1 
            } 
        ]
    },
    {
        "id" : 17,
        "name" : "Tory Foster",
        "type" : "Political Leader",
        "admiralInheritance" : 25,
        "cagInheritance" : 24,
        "presidentInheritance" : 6,
        "set" : "Exodus",
        "startLocation" : "Press Room",
        "oncePerTurnTitle" : "Adaptable",
        "oncePerTurnText" : "After any player uses the action on a Quorum Card, you may draw 2 Skill Cards of your choice (they may be from outside your skill set).",
        "oncePerGameTitle" : "Influential",
        "oncePerGameText" : "Action: Once per game, you may examine the top 5 cards of the Quorum deck and return them to the top of the deck in any order you choose (even if you are not currently the President).",
        "weaknessTitle" : "Amoral",
        "weaknessText" : "When you are the current player, you must choose the first option listed on any Crisis Card that say \"Current Player Chooses\".",
        "loyaltyWeight" : 1,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Politics",
                "amount" : 3 
            },
            {
                "sphere" : "Leadership",
                "amount" : 1 
            },
            {
                "sphere" : "Tactics",
                "amount" : 1
            }
        ]
    },
    {
        "id" : 18,
        "name" : "Felix Gaeta",
        "type" : "Military Leader",
        "admiralInheritance" : 5,
        "cagInheritance" : 13,
        "presidentInheritance" : 10,
        "set" : "Exodus",
        "startLocation" : "FTL Control",
        "oncePerTurnTitle" : "FTL Operator",
        "oncePerTurnText" : "Anytime \"FTL Control\" is activated, you may reroll the die. You must use the new result.",
        "oncePerGameTitle" : "Coup",
        "oncePerGameText" : "Action: Once per game, you may take the Admiral title. If you are in the \"Brig\" when you take this action, move immediately to \"Command\" before taking the title.",
        "weaknessTitle" : "Misguided",
        "weaknessText" : "You may not play more than 3 cards into any skill check.",
        "loyaltyWeight" : 1,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Tactics",
                "amount" : 2 
            },
            {
                "sphere" : "Engineering",
                "amount" : 1 
            },
            {
                "sphere" : "Leadership/Politics",
                "amount" : 2
            }
        ]
    },
    {
        "id" : 19,
        "name" : "Samuel T. Anders",
        "type" : "Pilot",
        "admiralInheritance" : 15,
        "cagInheritance" : 7,
        "presidentInheritance" : 24,
        "set" : "Exodus",
        "startLocation" : "Armory",
        "oncePerTurnTitle" : "Star Player",
        "oncePerTurnText" : "Action: Discard any number of Skill Cards. Then draw that number of Skill Cards from any one type within your skill set.",
        "oncePerGameTitle" : "Longshot",
        "oncePerGameText" : "Once per game, you may choose the result of a die roll on your turn instead of rolling it. This result cannot be modified or rerolled.",
        "weaknessTitle" : "Starts on the Bench",
        "weaknessText" : "Skip the Receive Skills Step of your first turn.",
        "loyaltyWeight" : 1,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Leadership",
                "amount" : 2 
            },
            {
                "sphere" : "Tactics",
                "amount" : 2 
            },
            {
                "sphere" : "Tactics/Piloting",
                "amount" : 1
            }
        ]
    },
    {
        "id" : 20,
        "name" : "Callandra \"Cally\" Tyrol",
        "type" : "Support",
        "admiralInheritance" : 17,
        "cagInheritance" : 18,
        "presidentInheritance" : 15,
        "set" : "Exodus",
        "startLocation" : "Hangar Deck",
        "oncePerTurnTitle" : "Quick Fix",
        "oncePerTurnText" : "On your turn, once all Skill Cards played into a skill check have been revealed, you may choose 1 card to discard before resolving skill check abilities and totaling strength.",
        "oncePerGameTitle" : "Discharge of a Firearm",
        "oncePerGameText" : "Action: Once per game, you may execute another character who is in your current location.",
        "weaknessTitle" : "Impulsive",
        "weaknessText" : "You cannot contribute only 1 Skill Card into a skill check. You must either contribute no Skill Cards or contribute 2 or more Skill Cards (Disregard this while you are in the \"Brig\").",
        "loyaltyWeight" : 1,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Politics",
                "amount" : 1 
            },
            {
                "sphere" : "Leadership",
                "amount" : 1 
            },
            {
                "sphere" : "Tactics",
                "amount" : 1
            },
            {
                "sphere" : "Engineering",
                "amount" : 2
            }
        ]
    },
    {
        "id" : 21,
        "name" : "Tom Zarek",
        "type" : "Military Leader",
        "admiralInheritance" : 7,
        "cagInheritance" : 16,
        "presidentInheritance" : 9,
        "set" : "Daybreak",
        "startLocation" : "Weapons Control",
        "oncePerTurnTitle" : "Necessary Steps",
        "oncePerTurnText" : "Each time a player draws a Mutiny card, you instead look at the top 2 cards of the Mutiny deck, give 1 to that player, and place the other on the bottom of the deck.",
        "oncePerGameTitle" : "Abuse Power",
        "oncePerGameText" : "Action: Once per game, draw 4 Mutiny Cards. Choose 1 of them to play and place the other 3 Mutiny Cards on the bottom of the deck. Ignore your \"Necessary Steps\" ability and do not move to the \"Brig\".",
        "weaknessTitle" : "Disreputable",
        "weaknessText" : "You start the game with 1 Mutiny Card.",
        "loyaltyWeight" : 1,
        "alternateOf" : 2,
        "draws" : [
            {
                "sphere" : "Politics",
                "amount" : 2 
            },
            {
                "sphere" : "Leadership",
                "amount" : 2 
            },
            {
                "sphere" : "Tactics",
                "amount" : 1
            }
        ]
    },
    {
        "id" : 22,
        "name" : "Louis Hoshi",
        "type" : "Military Leader",
        "admiralInheritance" : 6,
        "cagInheritance" : 15,
        "presidentInheritance" : 19,
        "set" : "Daybreak",
        "startLocation" : "Communications",
        "oncePerTurnTitle" : "Dutiful",
        "oncePerTurnText" : "Once during your turn, if you activate \"Command\", \"Communications\" or \"Weapons Control\", you may discard 1 Skill Card to immediately activate that location again.",
        "oncePerGameTitle" : "Organized",
        "oncePerGameText" : "Action: Once per game, if you are not in the \"Brig\", activate any 3 undamaged locations, regardless of where you are. You cannot activate the same location more than once nor any Cylon locations.",
        "weaknessTitle" : "Reluctant",
        "weaknessText" : "You must discard 1 Skill Card to use a Skill Card action.",
        "loyaltyWeight" : 1,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Leadership",
                "amount" : 2 
            },
            {
                "sphere" : "Tactics",
                "amount" : 2 
            },
            {
                "sphere" : "Engineering",
                "amount" : 1
            }
        ]
    },
    {
        "id" : 23,
        "name" : "Lee Adama",
        "type" : "Political Leader",
        "admiralInheritance" : 19,
        "cagInheritance" : 8,
        "presidentInheritance" : 3,
        "set" : "Daybreak",
        "startLocation" : "Admiral's Quarters",
        "oncePerTurnTitle" : "Forward Thinker",
        "oncePerTurnText" : "After you use an \"Executive Order\" Skill Card and the chosen player has finished moving and taking actions, you may activate your current location.",
        "oncePerGameTitle" : "Choose a Different Path",
        "oncePerGameText" : "Once per game, when you must make a choice on a Crisis Card, you may choose to have the result be: \"The current player discards 5 Skill Cards\".",
        "weaknessTitle" : "Moral Dilemma",
        "weaknessText" : "When you draw a Mutiny Card, you must discard 2 Skill Cards.",
        "loyaltyWeight" : 1,
        "alternateOf" : 7,
        "draws" : [
            {
                "sphere" : "Tactics",
                "amount" : 1 
            },
            {
                "sphere" : "Piloting",
                "amount" : 2 
            },
            {
                "sphere" : "Leadership/Politics",
                "amount" : 2
            }
        ]
    },
    {
        "id" : 24,
        "name" : "Romo Lampkin",
        "type" : "Political Leader",
        "admiralInheritance" : 24,
        "cagInheritance" : 25,
        "presidentInheritance" : 5,
        "set" : "Daybreak",
        "startLocation" : "Administration",
        "oncePerTurnTitle" : "Deceitful",
        "oncePerTurnText" : "When a Crisis Card requires you to discard Skill Cards, reduce the number of cards you discard by 1 (once per Crisis Card).",
        "oncePerGameTitle" : "Attorney",
        "oncePerGameText" : "Action: Once per game, move a character in the \"Brig\" to any non-hazardous location on Galactica. If he belongs to another player, take all of that player's Skill Cards.",
        "weaknessTitle" : "Kleptomania",
        "weaknessText" : "If you end your Movement Step in a location with another player, you must discard 2 Skill Cards. If you cannot, you are sent to the \"Brig\" at the end of your turn.",
        "loyaltyWeight" : 1,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Politics",
                "amount" : 3 
            },
            {
                "sphere" : "Tactics",
                "amount" : 2 
            }
        ]
    },
    {
        "id" : 25,
        "name" : "Karl \"Helo\" Agathon",
        "type" : "Pilot",
        "admiralInheritance" : 10,
        "cagInheritance" : 4,
        "presidentInheritance" : 20,
        "set" : "Daybreak",
        "startLocation" : "Admiral's Quarters",
        "oncePerTurnTitle" : "Raptor Pilot",
        "oncePerTurnText" : "When you look at the top card of a deck as a result of a \"Launch Scout\" card, look at the top 2 cards instead and, in the order of your choosing, place each card on the top or the bottom of the deck.",
        "oncePerGameTitle" : "No One Gets Left Behind",
        "oncePerGameText" : "Once per game, during the Remove Ships step of Jumping the Fleet, lose 1 fuel to gain 2 population.",
        "weaknessTitle" : "Family Commitments",
        "weaknessText" : "If you are not on Galactica, draw 1 fewer Skill Card during your Receive Skills step.",
        "loyaltyWeight" : 1,
        "alternateOf" : 5,
        "draws" : [
            {
                "sphere" : "Leadership",
                "amount" : 2 
            },
            {
                "sphere" : "Tactics",
                "amount" : 2 
            },
            {
                "sphere" : "Piloting",
                "amount" : 1
            }
        ]
    },
    {
        "id" : 26,
        "name" : "Brendan \"Hot Dog\" Costanza",
        "type" : "Pilot",
        "admiralInheritance" : 14,
        "cagInheritance" : 6,
        "presidentInheritance" : 23,
        "set" : "Daybreak",
        "startLocation" : "Hangar Deck",
        "oncePerTurnTitle" : "Memento",
        "oncePerTurnText" : "Once per turn, immediately after population is reduced, you may draw the top 3 cards from the Piloting deck, discard 1 of them, and keep the other 2 cards.",
        "oncePerGameTitle" : "Escort",
        "oncePerGameText" : "Once per game, before flipping over a civilian ship in a space area and destroying it, you may destroy an undamaged viper instead. Shuffle the civilian ship back into the pile of unused civilian ships.",
        "weaknessTitle" : "Forced to Eject",
        "weaknessText" : "Any time a viper you are piloting is damaged, destroy it instead.",
        "loyaltyWeight" : 1,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Leadership",
                "amount" : 1 
            },
            {
                "sphere" : "Tactics",
                "amount" : 1 
            },
            {
                "sphere" : "Piloting",
                "amount" : 2
            },
            {
                "sphere" : "Engineering",
                "amount" : 1
            }
        ]
    },
    {
        "id" : 27,
        "name" : "Sherman \"Doc\" Cottle",
        "type" : "Support",
        "admiralInheritance" : 18,
        "cagInheritance" : 19,
        "presidentInheritance" : 16,
        "set" : "Daybreak",
        "startLocation" : "Research Lab",
        "oncePerTurnTitle" : "Treatment",
        "oncePerTurnText" : "Action: Choose a human player and draw 2 Skill Cards from his skill set. Then, give him 2 Skill Cards from your hand.",
        "oncePerGameTitle" : "Quarantine",
        "oncePerGameText" : "Once per game, look at each civilian ship on the board. Choose 1 and draw a new civilian ship to replace it if possible. Shuffle the civilian ship back into the pile of unused civilian ships.",
        "weaknessTitle" : "Specialized",
        "weaknessText" : "You cannot use actions printed on Engineering Cards.",
        "loyaltyWeight" : 1,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Politics",
                "amount" : 1 
            },
            {
                "sphere" : "Tactics",
                "amount" : 2 
            },
            {
                "sphere" : "Engineering",
                "amount" : 2
            }
        ]
    },
    {
        "id" : 28,
        "name" : "Gaius Baltar",
        "type" : "Support",
        "admiralInheritance" : 22,
        "cagInheritance" : 22,
        "presidentInheritance" : 14,
        "set" : "Daybreak",
        "startLocation" : "Admiral's Quarters",
        "oncePerTurnTitle" : "Cult Leader",
        "oncePerTurnText" : "Action: Choose a player in the same location as you and either give him one of your miracle tokens or take his miracle token.",
        "oncePerGameTitle" : "Broadcast",
        "oncePerGameText" : "Discard 3 miracle tokens to raise any resource by 2.\r\nYou can have up to 3 miracle tokens.",
        "weaknessTitle" : "Spiritual Crisis",
        "weaknessText" : "You cannot use an action printed on a \"You are a Cylon\" Loyalty Card unless you are in the \"Brig\".",
        "loyaltyWeight" : 1,
        "alternateOf" : 1,
        "draws" : [
            {
                "sphere" : "Politics",
                "amount" : 2 
            },
            {
                "sphere" : "Leadership",
                "amount" : 2
            },
            {
                "sphere" : "Engineering",
                "amount" : 1
            }
        ]
    },
    {
        "id" : 29,
        "name" : "Aaron Doral",
        "type" : "Cylon Leader",
        "admiralInheritance" : 100,
        "cagInheritance" : 100,
        "presidentInheritance" : 100,
        "set" : "Daybreak",
        "startLocation" : "Caprica",
        "oncePerTurnTitle" : "Industrious",
        "oncePerTurnText" : "While infiltrating, draw 2 extra Skill Cards on your turn instead of 1. Disregard this ability while you are in \"Sickbay\"",
        "oncePerGameTitle" : "Meticulous",
        "oncePerGameText" : "Once per game, when you use an action to end your Infiltration, you may move to any Cylon location and take another action instead of moving to the Resurrection Ship.",
        "weaknessTitle" : "Vanity",
        "weaknessText" : "You cannot contribute to skill checks during another player's Action Step.",
        "loyaltyWeight" : 0,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Treachery",
                "amount" : 1 
            },
            {
                "sphere" : "Politics/Tactics",
                "amount" : 1
            }
        ]
    },
    {
        "id" : 30,
        "name" : "D'Anna Biers",
        "type" : "Cylon Leader",
        "admiralInheritance" : 100,
        "cagInheritance" : 100,
        "presidentInheritance" : 100,
        "set" : "Daybreak",
        "startLocation" : "Human Fleet",
        "oncePerTurnTitle" : "Visons",
        "oncePerTurnText" : "Action: If you are Infiltrating, choose a human player and look at 1 of his Loyalty Cards at random. Then, end your Infiltration and move to the \"Resurrection Ship\".",
        "oncePerGameTitle" : "Don't Trust Anyone",
        "oncePerGameText" : "Action: Once per game, draw 2 Super Crisis Cards.",
        "weaknessTitle" : "Heretic",
        "weaknessText" : "If you are on the \"Resurrection Ship\" location (but not the \"Hub Destroyed\" location), you must discard a Super Crisis Card to move to a different location.",
        "loyaltyWeight" : 0,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Leadership/Politics",
                "amount" : 1 
            },
            {
                "sphere" : "Treachery/Engineering",
                "amount" : 1
            }
        ]
    },
    {
        "id" : 31,
        "name" : "Simon O'Neill",
        "type" : "Cylon Leader",
        "admiralInheritance" : 100,
        "cagInheritance" : 100,
        "presidentInheritance" : 100,
        "set" : "Daybreak",
        "startLocation" : "Cylon Fleet",
        "oncePerTurnTitle" : "Calculating",
        "oncePerTurnText" : "You may contribute 2 Skill Cards to skill checks, or 2 Skill Cards when Infiltrating. Disregard this ability while you are in the \"Brig\".",
        "oncePerGameTitle" : "Modifications",
        "oncePerGameText" : "Once per game, at the start of a player's \"Activate Cylon Ships\" step, either choose a Cylon ship type to activate or launch raiders. Ignore any Activate Cylon Ships icons on the bottom of the Crisis Card.",
        "weaknessTitle" : "Logic-Bound",
        "weaknessText" : "When you play any Skill Cards into a skill check, you must play 1 face up.",
        "loyaltyWeight" : 0,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Engineering",
                "amount" : 1 
            },
            {
                "sphere" : "Treachery/Tactics",
                "amount" : 1
            }
        ]
    },
    {
        "id" : 32,
        "name" : "Sharon \"Athena\" Agathon",
        "type" : "Cylon Leader",
        "admiralInheritance" : 100,
        "cagInheritance" : 100,
        "presidentInheritance" : 100,
        "set" : "Daybreak",
        "startLocation" : "Hangar Deck (Infiltrating)",
        "oncePerTurnTitle" : "For Love",
        "oncePerTurnText" : "Once per turn, when another player must discard 1 or more Skill Cards (except when disregarding down to his hand limit), you may draw 1 Treachery Card to reduce the number of cards he discards by 1.",
        "oncePerGameTitle" : "Resolute",
        "oncePerGameText" : "Action: Once per game, activate any undamaged locations.",
        "weaknessTitle" : "Grieving",
        "weaknessText" : "When you are in a hazardous location, you cannot draw Skill Cards during your \"Receive Skills\" or \"Draw Skills\" step.",
        "loyaltyWeight" : 0,
        "alternateOf" : -1,
        "draws" : [
            {
                "sphere" : "Piloting",
                "amount" : 1 
            },
            {
                "sphere" : "Leadership/Engineering",
                "amount" : 1
            }
        ]
    }
];