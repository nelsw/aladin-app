import styled, { css } from 'styled-components';
import { animated } from 'react-spring';
import { spacing } from '../../common/constants';
import { Buttons } from '../button';
import { Flex } from '../primitives';

const Loading = styled(animated.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  z-index: 99;
  width: calc(100% + 60px);
  left: -30px;
  height: calc(100% + 98px);
  top: -80px;
`;

const Header = styled.div``;
const Title = styled(Flex)`
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;
`;
const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:not(:first-of-type):last-of-type {
    padding-left: ${spacing.base};
  }
`;
const AnimatedTitle = styled(animated.div)``;
const Content = styled(animated.div)`
  flex-grow: ${({ grow }) => (grow ? 1 : 0)};
  display: flex;
  flex-direction: column;
}
`;
const Actions = styled(animated.div)`
  @media (max-width: 599px) {
    padding-bottom: 30px;
  }
`;

const Main = styled(animated.div)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  @media (max-height: 700px) and (max-width: 599px) {
    flex-shrink: 0;
  }
`;
const Wrapper = styled(animated.div)`
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-grow: 1;
  &:first-of-type {
    z-index: 20;
  }
`;

const Sidebar = styled.div`
  position: relative;
  width: 342px;
  min-width: 342px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: white;
  padding: ${spacing.gutter};
  background-image: linear-gradient(97.35deg, #382c68 0%, #7858a2 173.24%);
  @media (max-width: 900px) {
    display: none;
  }
`;

const SidebarLogo = styled.div`
  position: absolute;
  top: 30px;
  left: 30px;
`;

const SidebarContent = styled.div`
  min-height: 400px;
  h1 {
    margin-bottom: ${spacing.gutter};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  padding: ${spacing.gutter};
  background: white;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 599px) {
    max-height: ${({ height }) => (height > 0 ? `${height}px` : '100vh')};
    min-height: ${({ height }) => (height > 0 ? `${height}px` : '100vh')};
    min-width: 100vw;
    overflow-y: auto;
    padding-bottom: 0;
  }
  @media (min-width: 600px) {
    max-width: 450px;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
  }
`;
const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  ${Wrapper} {
    position: relative;
    @media (min-width: 900px) {
    }
  }
`;

const StyledShell = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  min-height: ${({ width, height }) =>
    height > 0 && width <= 599 ? `${height}px` : '100vh'};
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9001;
  background-color: ${({ width }) =>
    width <= 599 ? 'white' : 'rgba(240, 240, 240, 0.85)'};
  ${({ maxHeight }) =>
    maxHeight &&
    css`
      ${ContentContainer} {
        @media (min-width: 600px) {
          max-height: calc(100vh - 120px) !important;
        }
      }
    `};

  ${({ invert }) =>
    invert
      ? css`
          @media (max-width: 599px) {
            background: linear-gradient(97.35deg, #382c68 0%, #7858a2 173.24%);
            overflow-y: auto !important;

            ${Actions} {
              margin-bottom: 0;
              ${Buttons} {
                margin-top: 0 !important;
              }
            }
            ${ContentContainer} {
              padding: 30px;
              background: transparent;
              border-radius: 0;
              box-shadow: none;
              max-height: none;
            }

            ${Wrapper} {
              background: white;
              border-radius: 8px;
            }
            ${Title}, ${Actions} {
              padding: ${spacing.gutter};
            }

            ${Content} {
              padding: 0 ${spacing.gutter};
            }

            ${Title} {
              border-bottom: 1px solid rgba(39, 15, 52, 0.1);
            }
          }
        `
      : css``};

  @media (min-width: 600px) {
    max-height: ${({ height }) => (height > 0 ? `${height}px` : '100vh')};
    overflow-y: auto;
    overflow-x: hidden;
    padding: 60px;
  }

  @media (max-height: 700px) {
    align-items: flex-start;
  }

  @media (max-width: 600px) {
    max-height: ${({ height }) => (height > 0 ? `${height}px` : '100vh')};
    overflow: hidden;
  }
  * {
    font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI',
      Roboto, sans-serif;
  }
  * {
    box-sizing: border-box;
  }
`;

StyledShell.Header = Header;
StyledShell.Title = Title;
StyledShell.Title.Section = TitleSection;
StyledShell.Title.Animated = AnimatedTitle;
StyledShell.Content = Content;
StyledShell.Actions = Actions;
StyledShell.Main = Main;
StyledShell.Wrapper = Wrapper;
StyledShell.Loading = Loading;
StyledShell.Sidebar = Sidebar;
StyledShell.Sidebar.Logo = SidebarLogo;
StyledShell.Sidebar.Content = SidebarContent;
StyledShell.Content.Container = ContentContainer;
StyledShell.Content.Wrapper = ContentWrapper;

export { StyledShell };
