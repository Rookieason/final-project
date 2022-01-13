import { Layout, Button, Menu } from "antd"
import { useRef, useState } from "react"
import "../Components/SixNimmt/sixNimmt.css"
import Player from "../Components/SixNimmt/Player"

const { Header, Content, Footer } = Layout;

const SixNimmt = ({setIsSixNimmt, me, sendLicensingCard,
                   isgamestart, setIsgamestart, selfCards,
                   cards, sendCompare, players}) => {
    const chosencardRef = useRef(0);
console.log(me, isgamestart)
    const roomname = "test";

    const gamestart = async () => {
        console.log("sixnimmt game initialization starts");
        setIsgamestart(true);                                                       // game start
        console.log(players)
        if (players[0] === me) {                                                  // if I am the host
            sendLicensingCard({room: roomname, number: players.length});
            console.log(roomname);
            //console.log(players)                                  // send license card req
        }

        /*for (var i = 0; i < 10; i++) {      // each person 出10次牌
            sendCompare({player: me, card: chosencard, number: players.length, room: roomname});
        }*/
    }
    const handleonclick = async (item) => {
            chosencardRef.current = item;
            sendCompare({player: me, card: chosencardRef.current, number: players.length, room: roomname});
        }
    
    return (
        <Layout>
            <Header>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    SixNimmt!
                </Menu>
            </Header>

            <Content>
                {isgamestart ? (
                <>
                <div className="MyHand">
                    <h3>My hand:</h3>
                    <div className="Self">
                        {selfCards.map((item) => {
                            return <div className = "SingleCard" onClick = {() => handleonclick(item)}> {item} </div>
                        })}
                    </div>
                </div>
                <div className="CardsArea">
                    {cards.map((singleRow, index1) => {
                        const Id = 'row'+index1.toString();
                        return (
                            <div className="CardsRow" key = {index1} id = {Id}>
                                {singleRow.map((item) => {
                                    return (
                                        <div className="SingleCard"> {item} </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                <div className="PlayerSeats">
                    {players.map((item, index1) => {
                        return <Player name = {item} key = {index1}/>
                    })}
                </div>
                </>) : 
                <>
                    <img id = "LobbyRoom" alt = "lobby_room" src={[require("./LOBBY_ROOM.png")]} width = "500" ></img>
                    <br></br>
                    <div className="GoBack"> 
                        <Button onClick={() => setIsSixNimmt(false)}>
                            Go Back!
                        </Button>
                    </div>
                </>
                }
            </Content>

            <div className="Footer">
            <strong>Instruction</strong> <br></br>
            There are 104 cards numbered from 1 to 104. Every card has 1 to 7 small bull head on it, which will score against you.<br></br>
            A round of ten turns is played where all players place one card of their choice onto the table.<br></br>
            At each turn, each player selects a card to play, and puts the card face down on the table. When all the players have selected a card, the cards are uncovered.<br></br>
            Starting with the lowest valued card, and continuing in increasing order, each player must put their card at the end of one of the four rows on the table, following these rules:<br></br><br></br>

            <li>The card must be put on a row where the latest (end) card is lower in value than the card that is about to be played.</li>
            <li>The card must be put on the row where the latest (end) card is the closest in value to the card that is about to be played (if your card is 33, then place it next to the 30 not the 29, for example)</li>
            <li>If the row where the played card must be placed already contains 5 cards (the player's card is the 6th), the player must gather the 5 cards on the table, leaving only the 6th card in their place to start a new row.</li>
            <li>The gathered cards must be taken separated and never mixed with the hand cards. The sum of the number of cattle head on the gathered cards will be calculated at the end of the round.</li>
            <li>If the played card is lower than all the latest cards present on the four rows, the player must choose a row and gather the cards on that row (usually the row with the fewest cattle heads), leaving only the played card on the row.</li>
            <li>The cards of all the players are played following these rules, from the lowest player card to the highest one.</li><br></br>

            At the end of the turn, the players each select a new card to play; this is repeated for 10 turns until all the cards in the hand are played.<br></br>
            After the 10 turns, each player counts the cattle heads on the cards gathered from the table during the round. The score of each player is collected on the paper and a new hand starts.<br></br>
            The game ends when a player collects a total of 66 or more cattle heads. The winner is the player who has collected <strong>the fewest cattle heads</strong>.<br></br>
            </div>
            {isgamestart ? (
                <></>):
                <><div className="StartGame"> 
                <Button onClick = {() => gamestart()}>START GAME </Button>
                </div></>
            }
            {/*players[0] === me ? <button onClick = {() => gamestart()}></button> : <></>*/}
        </Layout>
    )
}

export default SixNimmt;