import React from 'react';
import { DashboardCard, DashboardCardBox, DashboardCardWrapper, DashboardHeading, DashboardMainContainer } from './dashboardContentStyled';

function DashboardContent(props) {
    return (
        <>
            <DashboardMainContainer>
                <DashboardCardWrapper>
                    <DashboardHeading>
                        
                        Dashboard

                    </DashboardHeading>
                    <DashboardCardBox>
                        <DashboardCard>

                        </DashboardCard>

                    </DashboardCardBox>


                </DashboardCardWrapper>

            </DashboardMainContainer>
        </>
    );
}

export default DashboardContent;