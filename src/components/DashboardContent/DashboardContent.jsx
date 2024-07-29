import React from 'react';
import { DashboardCard, DashboardCardBox, DashboardCardInnerBox, DashboardCardWrapper, DashboardHeading, DashboardMainContainer } from './dashboardContentStyled';

function DashboardContent(props) {
    return (
        <>
            <DashboardMainContainer>
                <DashboardCardWrapper>
                    <DashboardHeading>
                        
                        Dashboard

                    </DashboardHeading>
                    <DashboardCardBox>
                        <DashboardCardInnerBox>


                        </DashboardCardInnerBox>

                    </DashboardCardBox>


                </DashboardCardWrapper>

            </DashboardMainContainer>
        </>
    );
}

export default DashboardContent;